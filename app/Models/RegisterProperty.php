<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;

use function Termwind\render;

class RegisterProperty extends Model
{
    use HasFactory;
    protected $fillable = [
        'owner_name',
        'owner_email',
        'owner_number',
        'street',
        'village',
        'district',
        'regency',
        'province',
        'description',
    ];
}
