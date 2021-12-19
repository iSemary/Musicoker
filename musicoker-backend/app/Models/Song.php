<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'hashed_name', 'length', 'album', 'album_artist', 'size', 'image'];

}
