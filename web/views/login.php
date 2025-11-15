<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Login</title>

<style>
    body {
        margin: 0;
        font-family: "Inter", sans-serif;
        height: 100vh;
        display: flex;
        justify-content: flex-end; /* form sang bên phải */
        align-items: center;
        background: linear-gradient(135deg, #6a11cb, #2575fc, #ff6f91, #ffc371);
        background-size: 300% 300%;
        animation: gradientFlow 12s ease infinite;
    }

    @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    .login-box {
        width: 380px;
        margin-right: 8%;
        padding: 40px;
        border-radius: 20px;
        backdrop-filter: blur(18px);
        background: rgba(255, 255, 255, 0.15);
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        color: white;
        animation: fadeIn 0.8s ease-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateX(40px); }
        to { opacity: 1; transform: translateX(0); }
    }

    .login-box h2 {
        margin-bottom: 25px;
        font-size: 28px;
        font-weight: 600;
        text-align: center;
    }

    .input-group {
        margin-bottom: 18px;
    }

    .input-group label {
        font-size: 14px;
        opacity: 0.9;
    }

    .input-group input {
        width: 100%;
        padding: 12px 16px;
        margin-top: 6px;
        border-radius: 12px;
        border: none;
        outline: none;
        background: rgba(255, 255, 255, 0.25);
        color: #fff;
        font-size: 15px;
        box-shadow: inset 0 0 8px rgba(255,255,255,0.15);
    }

    .input-group input::placeholder {
        color: #eeeeee;
        opacity: 0.7;
    }

    .btn-login {
        width: 100%;
        padding: 14px;
        border-radius: 12px;
        border: none;
        background: #ffffff;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        margin-top: 8px;
        transition: 0.25s;
    }

    .btn-login:hover {
        background: #e5e5e5;
        transform: translateY(-2px);
    }

    .error-msg {
        text-align: center;
        margin-bottom: 10px;
        color: #ffdddd;
        font-size: 14px;
    }
</style>

</head>
<body>

<div class="login-box">
    <h2>Đăng nhập hệ thống</h2>

    <?php if(!empty($error)): ?>
        <div class="error-msg"><?= $error ?></div>
    <?php endif; ?>

    <form method="POST" action="/auth/login">
        <div class="input-group">
            <label>Tên đăng nhập</label>
            <input type="text" name="username" placeholder="admin" required>
        </div>

        <div class="input-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" placeholder="•••••" required>
        </div>

        <button class="btn-login">Đăng nhập</button>
    </form>
</div>

</body>
</html>
