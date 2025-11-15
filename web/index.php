<?php
session_start();

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Route check
switch ($uri) {

    case '/':
    case '/login':
        require __DIR__ . '/views/login.php';
        break;

    case '/auth/login':
        require __DIR__ . '/controllers/AuthController.php';
        $auth = new AuthController();
        $auth->login();
        break;

    case '/logout':
        require __DIR__ . '/controllers/AuthController.php';
        $auth = new AuthController();
        $auth->logout();
        break;

    case '/dashboard':
        if (!isset($_SESSION['user'])) {
            header("Location: /login");
            exit;
        }
        require __DIR__ . '/views/dashboard.php';
        break;

    default:
        http_response_code(404);
        echo "<h1>404 Not Found</h1>";
}
