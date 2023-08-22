<?php

namespace App\Services;

use App\Models\User;

class AuthService {

    // create new user after registration
    public function create(array $data){
        return User::create($data);
    }
}