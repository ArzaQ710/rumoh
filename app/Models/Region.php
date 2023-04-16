<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
    use HasFactory;

    protected $fillable = [
        'level',
        'name',
    ];

    public function villages()
    {
        $this->query()->where('level', '=', 'village')->get();
    }

    public function districts()
    {
        $this->query()->where('level', '=', 'district')->get();
    }

    public function regencies()
    {
        $this->query()->where('level', '=', 'regency')->get();
    }

    public function provinces()
    {
        $this->query()->where('level', '=', 'province')->get();
    }
}
