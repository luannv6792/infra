<?php

class AuthController {

    public function showLogin() {
        $error = $_SESSION['error'] ?? null;
        unset($_SESSION['error']);
        require "views/login.php";
    }

    public function login() {
        $config = require "config.php";
        $api_url = $config["backend_url"];

        $username = $_POST['username'];
        $password = $_POST['password'];

        // Gọi backend Python API
        $payload = json_encode([
            "username" => $username,
            "password" => $password,
        ]);

        $ch = curl_init($api_url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);

        $response = curl_exec($ch);
        $data = json_decode($response, true);

        // Nếu backend xác thực thành công
        if (!empty($data["status"]) && $data["status"] === "success") {
            $_SESSION["user"] = $username;
            header("Location: /dashboard");
            exit;
        }

        // Mặc định local auth nếu backend chưa sẵn:
        if ($username === "admin" && $password === "admin") {
            $_SESSION["user"] = "admin";
            header("Location: /dashboard");
            exit;
        }

        $_SESSION['error'] = "Sai tài khoản hoặc mật khẩu!";
        header("Location: /login");
    }

    public function logout() {
        session_destroy();
        header("Location: /login");  // QUAY VỀ TRANG CHỦ LOGIN
        exit;
    }
}
