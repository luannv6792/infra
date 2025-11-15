<?php
session_start();

require_once "controllers/AuthController.php";
require_once "controllers/DashboardController.php";

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

switch ($uri) {
    case '/':
    case '/login':
        (new AuthController())->showLogin();
        break;

    case '/auth/login':
        (new AuthController())->login();
        break;

    case '/auth/logout':
        (new AuthController())->logout();
        break;

    case '/dashboard':
        (new DashboardController())->index();
        break;

    default:
        echo "404 Not Found";
}
