<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'status',
        'price',
        'numberOfBedroom',
        'numberOfBathroom',
        'landArea',
        'street',
        'village',
        'district',
        'regency',
        'map_coord',
    ];

    public static function boot()
    {
        parent::boot();
        self::deleting(function ($property) {
            $property->images()->each(function ($image) {
                File::delete(public_path($image->image_url));
            });
        });
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function address()
    {
        return $this->hasOne(Address::class);
    }
}
