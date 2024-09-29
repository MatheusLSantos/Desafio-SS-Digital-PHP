<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\UserRegistrationMail;

class AuthController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.login'); // Retorna a view de login
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($token = Auth::attempt($credentials)) {
            // Autenticação bem-sucedida
            $user = auth()->user();

            // Verifica se o email foi verificado
            if ($user->email_verified_at === null) {
                return response()->json([
                    'message' => 'Por favor, verifique seu e-mail antes de fazer login.',
                ], 403); // Retorna código 403 (proibido)
            }

            return response()->json([
                'token' => $token,
                'user' => [
                    'email' => $user -> email
                ]
                ]);
        }

        // Falha na autenticação
        return response()->json([
            'message' => 'As credenciais fornecidas estão incorretas.',
            ],401);
    }

    public function logout(Request $request)
    {
        // logout bem-sucedido
        auth()->logout();
        return response()->json([
            'message' => 'Logout realizado com sucesso.',
            ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
            'password'=> 'required|string'
        ]);
        $user = User::create([
            'email'=>$request -> email,
            'password'=>Hash::make($request->password),
            'activation_code'=>Str::random(6)
        ]);
        Mail::to($request->email)->send(new UserRegistrationMail($user->activation_code));
        return response()->json([
            'message' => 'Usuário registrado. Verifique seu e-mail para ativar sua conta.',
            ]);
    }

    public function activate(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
            'activation_code'=> 'required|string'
        ]);
        $user = User::where('email', $request -> email)->first();
        if ($request->activation_code == $user -> activation_code) {
            $user -> email_verified_at = time();
            return response()-> json(['message' => 'Conta ativada com sucesso!']);
        } else {
            return response()-> json(['message' => 'Código incorreto'],401);
        }
    }

    public function showWelcome()
    {
        return view('welcome'); // Retorna a view de boas-vindas
    }
}
