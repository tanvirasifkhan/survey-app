<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Survey;

class Survey extends Model {
    use HasFactory;

    protected $table = 'surveys';

    protected $fillable = ['title', 'user_id', 'description', 'questions'];
}