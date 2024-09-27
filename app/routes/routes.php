<?php
use App\Controllers\AuthController;

$app->post('/login', function () {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $authController = new AuthController();
    return $authController->login($email, $password);
});

$app->post('/logout', function () {
    $authController = new AuthController();
    return $authController->logout();
});
