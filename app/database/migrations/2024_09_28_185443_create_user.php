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
        // Adiciona a coluna 'activation_code' na tabela 'users'
        Schema::table('users', function (Blueprint $table) {
            $table->string('activation_code')->nullable()->after('remember_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove a coluna 'activation_code'
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('activation_code');
        });
    }
};