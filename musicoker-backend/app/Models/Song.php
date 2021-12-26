<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'name', 'hash_key', 'length','current_length', 'album', 'album_artist', 'size', 'image'];

}
