<?php
class AuthController {

    public function login() {
        $username = $_POST['username'] ?? '';
        $password = $_POST['password'] ?? '';

        // simple login without backend
        if ($username === 'admin' && $password === 'admin') {
            $_SESSION['user'] = 'admin';
            header("Location: /dashboard");
            exit;
        }

        // fail
        $_SESSION['login_error'] = "Sai tài khoản hoặc mật khẩu!";
        header("Location: /login");
        exit;
    }

    public function logout() {
        session_destroy();
        header("Location: /login");
        exit;
    }
}
