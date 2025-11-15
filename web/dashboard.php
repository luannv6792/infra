<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: index.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script defer src="assets/js/app.js"></script>
</head>
<body class="dashboard-body">

<div class="header">
    <h2>Hệ thống giám sát</h2>

    <div class="theme-toggle">
        <button id="themeBtn">🌓</button>
    </div>
</div>

<div class="dashboard-container">

    <!-- MENU BÊN PHẢI -->
    <div class="sidebar">
        <div class="menu-card">📊 Overview</div>
        <div class="menu-card">📁 Application List</div>
        <div class="menu-card">⚙️ Cài đặt</div>
        <a href="logout.php" class="menu-card logout">🚪 Đăng xuất</a>
    </div>

    <!-- NỘI DUNG CHÍNH -->
    <div class="content-area">
        <h3>Chào mừng, Admin</h3>
        <p>Đây là giao diện dashboard mẫu. Bạn có thể thêm biểu đồ, thống kê…</p>
        <div class="widget">
            <h4>Số lượng máy chủ</h4>
            <p>12</p>
        </div>
        <div class="widget">
            <h4>Trạng thái hệ thống</h4>
            <p>Ổn định</p>
        </div>
    </div>

</div>

</body>
</html>
