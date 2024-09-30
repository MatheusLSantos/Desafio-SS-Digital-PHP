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
        // Remove a coluna 'name' e adiciona a coluna 'activation_code' na tabela 'users'
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name'); // Remove a coluna 'name'
            $table->string('activation_code')->nullable()->after('remember_token'); // Adiciona a coluna 'activation_code'
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Restaura a coluna 'name' e remove a coluna 'activation_code'
        Schema::table('users', function (Blueprint $table) {
            $table->string('name')->after('id'); // Adiciona a coluna 'name' de volta
            $table->dropColumn('activation_code'); // Remove a coluna 'activation_code'
        });
    }
};