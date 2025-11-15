<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title><?= $title ?? "Dashboard" ?></title>
    <link rel="stylesheet" href="/assets/style.css">
    <script src="/assets/script.js" defer></script>
</head>
<body class="light-mode" id="body">

<div class="top-bar">
    <div class="title">Hệ thống quản trị</div>
    <div class="top-actions">
        <button id="modeToggle" class="mode-btn">🌙 / ☀️</button>
        <a href="/logout" class="logout-btn">Logout</a>
    </div>
</div>

<div class="container">
    <div class="sidebar">
        <div class="menu-card"><a href="/dashboard">Overview</a></div>
        <div class="menu-card"><a href="/apps">Application List</a></div>
        <div class="menu-card"><a href="/settings">Cài đặt</a></div>
    </div>

    <div class="content">
        <?= $content ?>
    </div>
</div>

</body>
</html>
