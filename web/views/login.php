<?php
$err = $_SESSION['login_error'] ?? '';
unset($_SESSION['login_error']);
?>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="/assets/login.css">
</head>
<body>

<div class="bg-container">
    <div class="bg-slide" style="background-image:url('/assets/images/tech1.jpg');"></div>
    <div class="bg-slide" style="background-image:url('/assets/images/tech2.jpg');"></div>
    <div class="bg-slide" style="background-image:url('/assets/images/tech3.jpg');"></div>
    <div class="bg-slide" style="background-image:url('/assets/images/tech4.jpg');"></div>
    <div class="bg-slide" style="background-image:url('/assets/images/tech5.jpg');"></div>
    <div class="bg-slide" style="background-image:url('/assets/images/tech6.jpg');"></div>
</div>

<div class="login-wrapper">
    <h2>Login</h2>
    <form method="POST" action="/auth/login">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
        <?php if($err): ?>
        <div class="error"><?= $err ?></div>
        <?php endif; ?>
    </form>
</div>

<script src="/assets/login.js"></script>
</body>
</html>
