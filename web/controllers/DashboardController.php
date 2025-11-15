<?php

class DashboardController {
    public function index() {
        if (empty($_SESSION['user'])) {
            header("Location: /login");
            exit;
        }
        require "views/dashboard.php";
    }
}
