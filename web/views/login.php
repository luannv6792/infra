<?php
$err = $_SESSION['login_error'] ?? '';
unset($_SESSION['login_error']);
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <style>
        body {
            margin: 0;
            height: 100vh;
            font-family: Arial;
            background: linear-gradient(135deg, #4c1d95, #7c3aed, #ec4899, #f43f5e);
            background-size: 300% 300%;
            animation: gradientMove 10s ease infinite;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        .container {
            width: 900px;
            height: 500px;
            display: flex;
            backdrop-filter: blur(10px);
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            overflow: hidden;
        }

        .left {
            width: 60%;
            padding: 40px;
            color: white;
        }

        .right {
            width: 40%;
            background: rgba(255,255,255,0.15);
            backdrop-filter: blur(15px);
            padding: 40px;
        }

        .login-box {
            margin-top: 40px;
        }

        .input {
            width: 100%;
            padding: 12px;
            margin-top: 10px;
            border-radius: 8px;
            border: none;
            outline: none;
        }

        .btn {
            width: 100%;
            padding: 12px;
            margin-top: 20px;
            border: none;
            background: #4c1d95;
            color: white;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
        }

        .btn:hover {
            background: #7c3aed;
        }

        .error {
            color: yellow;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="container">

        <div class="left">
            <h1>Welcome Back!</h1>
            <p>Infrastructure management system</p>
        </div>

        <div class="right">
            <h2>Login</h2>
            <form method="POST" action="/auth/login" class="login-box">
                <input class="input" type="text" name="username" placeholder="Username" required>
                <input class="input" type="password" name="password" placeholder="Password" required>
                <button class="btn">Login</button>
                <?php if ($err): ?>
                    <div class="error"><?= $err ?></div>
                <?php endif; ?>
            </form>
        </div>

    </div>
</body>
</html>
