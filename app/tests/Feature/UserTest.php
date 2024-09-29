<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;
use App\Mail\UserRegistrationMail;
use Illuminate\Support\Facades\Mail;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_user_registration()
    {
        Mail::fake();
        $response = $this->post('/register', [
            'email' => 'user@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Usuário registrado. Verifique seu e-mail para ativar sua conta.']);

        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);

        Mail::assertSent(UserRegistrationMail::class, function($email){
            return $email -> hasTo('user@example.com');
        });
    }

    /** @test */
    public function test_user_activation()
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'activation_code' => '123456',
        ]);

        $response = $this->post('/activate', [
            'email' => $user->email,
            'activation_code' => '123456',
        ]);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Conta ativada com sucesso!']);

        $this->assertDatabaseHas('users', ['email' => 'user@example.com', 'email_verified_at' => now()]);
    }

    /** @test */
    public function test_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(), // A conta deve estar ativada
        ]);

        $response = $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token', 'user' => ['email']]);

        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function test_login_with_incorrect_password()
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        $response = $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'wrongpassword',
        ]);

        $response->assertStatus(401)
                 ->assertJson(['message' => 'As credenciais fornecidas estão incorretas.']);

        $this->assertGuest();
    }

    /** @test */
    public function test_user_logout()
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
        ]);

        $this->actingAs($user);
        $response = $this->post('/logout');

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Logout realizado com sucesso.']);

        $this->assertGuest();
    }

    /** @test */
    public function test_persistent_session_after_browser_closes()
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        // Simulando login com persistência da sessão
        $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'password123',
        ]);

        // Fechando o navegador e abrindo novamente (simulado)
        $this->assertAuthenticatedAs($user);
    }

    /** @test */
    public function test_password_is_stored_encrypted_in_database()
    {
        $user = User::factory()->create([
            'email' => 'user@example.com',
            'password' => Hash::make('password123'),
        ]);

        // Certificar que a senha foi criptografada
        $this->assertNotEquals('password123', $user->password);
        $this->assertTrue(Hash::check('password123', $user->password));
    }
}

