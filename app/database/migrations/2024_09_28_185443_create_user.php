<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Cria uma coluna 'id' auto-incrementável
            $table->string('email')->unique(); // Adiciona uma coluna para o e-mail do usuário
            $table->timestamp('email_verified_at')->nullable(); // Adiciona uma coluna para verificar o e-mail
            $table->string('password'); // Adiciona uma coluna para a senha
            $table->string('remember_token')->nullable(); // Adiciona uma coluna para o token de "lembrar"
            $table->string('activation_code')->nullable(); // Adiciona uma coluna para o código de ativação
            $table->timestamps(); // Adiciona as colunas 'created_at' e 'updated_at'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users'); // Remove a tabela 'users'
    }
};
