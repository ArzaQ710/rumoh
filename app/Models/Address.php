<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'street',
        'village_id',
        'district_id',
        'regency_id',
        'province_id',
    ];

    public function village()
    {
        return $this->hasOne(Village::class);
    }

    public function district()
    {
        return $this->hasOne(District::class);
    }

    public function regency()
    {
        return $this->hasOne(Regency::class);
    }

    public function province()
    {
        return $this->hasOne(Province::class);
    }

    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
