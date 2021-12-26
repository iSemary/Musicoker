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
    /*
     TODO make Validations
        Create Auth Playlist for each user
    */
    public function index(Request $request)
    {
//        $songs  = Song::where("user_id",Auth::id())->get();
        $songs = Song::orderBy('id','desc')->get();
        return response()->json([
            'status'=>200,
            'songs'=>$songs
        ]);
    }
    public function latest_song(){
        $song = Song::latest()->first();
        return response()->json([
            'status'=>200,
            'song'=>$song
        ]);
    }

    public function store(Request $request)
    {
        // Store the song with MD5 hash name
        $song_path = '/uploads/songs/';
        $SongFile = $request->song;
        $SongFile->storeAs($song_path, md5($SongFile) . '.' . $SongFile->getClientOriginalExtension(), 'public_folder');

        // Get Song Meta Information
        $track = new GetId3($SongFile);
        // If Track has artwork image
        // Split image from mp3
        $artwork = null;
        if ($track->getArtwork()) {
            $image = str_replace('data:image/png;base64,', '', $track->getArtwork());
            $image = str_replace(' ', '+', $track->getArtwork());
            $imageName = md5($SongFile) . '.jpg';
            $image_path = '/uploads/artworks/';
            // Save Image in another folder
            Storage::disk('public_folder')->put($image_path . $imageName, base64_decode($image));
            $artwork = $image_path . md5($SongFile) . '.jpg';
        }

        $Song = Song::create([
            'user_id' => Auth::id(),
            'name' => $SongFile->getClientOriginalName(),
            'hash_key' => $song_path . md5($SongFile) . '.' . $SongFile->getClientOriginalExtension(),
            'length' => date('H:i:s.v', $track->getPlaytimeSeconds()) ?? "00:00:00.000",
            'album' => $track->getAlbum(),
            'album_artist' => $track->getArtist(),
            'size' => $SongFile->getSize(),
            'image' => $artwork,
        ]);

    }
}
