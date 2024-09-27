<?php
namespace App\Models;

use PDO;

class User {
    private $pdo;

    public function __construct() {
        $this->pdo = new PDO('pgsql:host=localhost;dbname=matheus', 'matheus', 'password');
    }

    public function findByEmail($email) {
        $stmt = $this->pdo->prepare("SELECT * FROM matheus_usuarios WHERE email = :email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
