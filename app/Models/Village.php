<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Village extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function Addresses()
    {
        return $this->belongsToMany(Address::class, 'id', 'village_id');
    }
}
