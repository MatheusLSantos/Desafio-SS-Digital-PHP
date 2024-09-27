<?php
namespace App\Controllers;

use PDO;
use App\Models\User;

class AuthController {
    public function login($email, $password) {
        $user = User::findByEmail($email);
        if ($user && password_verify($password, $user['senha'])) {
            session_start();
            $_SESSION['user'] = $user['id'];
            setcookie("user_session", session_id(), time() + (86400 * 30), "/"); // Persistir por 30 dias
            return "Login com sucesso!";
        } else {
            return "Credenciais inválidas";
        }
    }

    public function logout() {
        session_start();
        session_destroy();
        setcookie("user_session", "", time() - 3600, "/");
    }
}
