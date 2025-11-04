<?php
$config = include __DIR__ . '/config.php';
?>
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Dashboard thống kê</title>
  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    body { background: #f5f7fb; }
    .card-hero { background: linear-gradient(90deg,#0d6efd20,#6f42c120); border: none; }
    .chart-card { height: 360px; }
  </style>
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">IT Ops Dashboard</a>
    <div class="d-flex">
      <button id="btnLogout" class="btn btn-outline-light btn-sm d-none">Logout</button>
    </div>
  </div>
</nav>

<div class="container my-4">
  <div id="loginSection" class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-sm">
        <div class="card-body">
          <h5 class="card-title">Đăng nhập</h5>
          <form id="loginForm">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input id="email" type="email" class="form-control" required>
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input id="password" type="password" class="form-control" required>
            </div>
            <div id="loginAlert" class="alert alert-danger d-none" role="alert"></div>
            <button class="btn btn-primary w-100" type="submit">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <div id="dashboard" class="d-none">
    <div class="row mb-3">
      <div class="col">
        <div class="card card-hero p-4 shadow-sm">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h4>Thống kê hệ thống</h4>
              <p class="mb-0 text-muted">Tổng quan số liệu hoạt động</p>
            </div>
            <div>
              <small id="userInfo" class="text-muted"></small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-3">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h6 class="card-title">Biểu đồ trend (request trong 7 ngày)</h6>
            <div class="chart-card">
              <canvas id="lineChart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h6 class="card-title">Phân bố dịch vụ</h6>
            <div class="chart-card">
              <canvas id="barChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-3">
      <div class="col">
        <div id="rawData" class="card shadow-sm">
          <div class="card-body">
            <h6 class="card-title">Dữ liệu (raw)</h6>
            <pre id="rawPre" style="max-height:300px; overflow:auto;"></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
const BACKEND_BASE = '<?php echo addslashes($config["BACKEND_BASE"]); ?>';

// Helpers
function showAlert(msg) {
  const a = document.getElementById('loginAlert');
  a.textContent = msg;
  a.classList.remove('d-none');
}
function hideAlert() {
  document.getElementById('loginAlert').classList.add('d-none');
}

// Login form submit
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  hideAlert();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch(BACKEND_BASE + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include' // in case backend sets cookie
    });
    if (!res.ok) {
      const txt = await res.text();
      showAlert('Đăng nhập thất bại: ' + (txt || res.status));
      return;
    }
    const data = await res.json();
    // nếu backend trả JWT:
    if (data.token) localStorage.setItem('jwt', data.token);
    // hiển thị dashboard
    document.getElementById('loginSection').classList.add('d-none');
    document.getElementById('dashboard').classList.remove('d-none');
    document.getElementById('btnLogout').classList.remove('d-none');
    document.getElementById('userInfo').textContent = data.user ? data.user.email || data.user.name : '';
    loadStats();
  } catch (err) {
    showAlert('Lỗi mạng: ' + err.message);
  }
});

// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
  localStorage.removeItem('jwt');
  document.getElementById('dashboard').classList.add('d-none');
  document.getElementById('loginSection').classList.remove('d-none');
  document.getElementById('btnLogout').classList.add('d-none');
});

// Load stats for charts
async function loadStats() {
  try {
    const token = localStorage.getItem('jwt');
    const headers = token ? { 'Authorization': 'Bearer ' + token } : {};
    const res = await fetch(BACKEND_BASE + '/stats', { headers, credentials: 'include' });
    if (!res.ok) {
      document.getElementById('rawPre').textContent = 'Không lấy được dữ liệu: ' + res.status;
      return;
    }
    const data = await res.json();
    document.getElementById('rawPre').textContent = JSON.stringify(data, null, 2);
    renderLineChart(data.trend || mockTrend());
    renderBarChart(data.services || mockServices());
  } catch (err) {
    document.getElementById('rawPre').textContent = 'Lỗi: ' + err.message;
    renderLineChart(mockTrend());
    renderBarChart(mockServices());
  }
}

// Chart rendering
let lineChart, barChart;
function renderLineChart(payload) {
  const ctx = document.getElementById('lineChart');
  const labels = payload.labels || [];
  const values = payload.values || [];
  if (lineChart) lineChart.destroy();
  lineChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{ label: 'Requests', data: values, tension: 0.3, fill: true }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}
function renderBarChart(payload) {
  const ctx = document.getElementById('barChart');
  const labels = payload.labels || [];
  const values = payload.values || [];
  if (barChart) barChart.destroy();
  barChart = new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{ label: 'Số lượng', data: values }] },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// Mock data fallback
function mockTrend() {
  return { labels: ['-6','-5','-4','-3','-2','-1','0'], values: [12,20,15,22,30,28,35] };
}
function mockServices() {
  return { labels: ['API','DB','Cache','Auth'], values:[120,80,40,30] };
}
</script>
</body>
</html>

