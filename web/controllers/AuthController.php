<?php

class AuthController {

    public function showLogin() {
        $error = $_SESSION['error'] ?? null;
        unset($_SESSION['error']);
        require "views/login.php";
    }

    public function login() {
        $username = $_POST['username'];
        $password = $_POST['password'];

        // Đăng nhập local – KHÔNG gọi backend
        if ($username === "admin" && $password === "admin") {
            $_SESSION["user"] = "admin";
            header("Location: /dashboard");
            exit;
        }

        // Sai tài khoản
        $_SESSION['error'] = "Sai tài khoản hoặc mật khẩu!";
        header("Location: /login");
    }

    public function logout() {
        session_destroy();
        header("Location: /login");
        exit;
    }
}
