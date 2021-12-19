<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Song;
use App\Http\Requests\StoreSongRequest;
use App\Http\Requests\UpdateSongRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use wapmorgan\Mp3Info\Mp3Info;
use Owenoj\LaravelGetId3\GetId3;

class SongController extends Controller
{
    public function store(Request $request)
    {
        // TODO make Validations

        // Store the song with MD5 hash name
        $SongFile = $request->song;
        $SongFile->storeAs('/uploads/songs/', md5($SongFile) . '.' . $SongFile->getClientOriginalExtension(), 'public');

        // Get Song Meta Information
        $track = new GetId3($SongFile);

        // Split image from mp3

        $image = str_replace('data:image/png;base64,', '', $track->getArtwork());
        $image = str_replace(' ', '+', $track->getArtwork());
        $imageName = md5($SongFile). '.jpg';
        // Save Image in another folder

        Storage::disk('public')->put('/uploads/artworks/' . $imageName,base64_decode($image));


        $Song = Song::create([
            'user_id' => Auth::id(),
            'name' => $SongFile->getClientOriginalName(),
            'hash_key' => md5($SongFile),
            'length' => date('H:i:s.v', $track->getPlaytimeSeconds()) ?? "00:00:00.000",
            'album' => $track->getAlbum(),
            'album_artist' => $track->getArtist(),
            'size' => $SongFile->getSize(),
            'image' => md5($SongFile). '.jpg',
        ]);

//        return response()->json();

    }
}
