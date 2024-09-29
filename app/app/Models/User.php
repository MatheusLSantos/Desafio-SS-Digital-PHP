<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Define fillable fields for mass assignment
    protected $fillable = ['email', 'password', 'activation_code', 'email_verified_at', 'remember_token'];

    // Hide attributes when casting to array or JSON (e.g., API responses)
    protected $hidden = ['password'];
}
