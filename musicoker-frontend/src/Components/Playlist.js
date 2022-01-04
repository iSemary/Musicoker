import React, {useEffect, useRef, useState} from "react";
import Player from "./Player";
import Box from '@mui/material/Box';
import LinearProgress from "@material-ui/core/LinearProgress";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import DefaultImg from '../assets/img/default.jpg';
import {faList} from "@fortawesome/free-solid-svg-icons";

library.add(faList);
const axios = require('axios');

function Playlist() {
    const PlaylistSongs = useRef({});

    const [Playlistloading, setPlaylistLoading] = useState(true);
    const [songs, setSongs] = useState([]);

    const [Song, setSong] = useState('http://localhost:8000/uploads/songs/c2dba4184e6b8c0742e061f465abaf7c.m4a');
    const [CurrentSong, setCurrentSong] = useState({
        name: '',
        id: '',
        hash_key: '',
        album: '',
        album_artist: '',
        length: '',
        current_length: '',
        image: '',
        size: '',
        playedTime: 0,
        song: '',
    });



    const PlayNow = (index) => {
        let songData = PlaylistSongs.current[index].dataset;

        let allList = document.querySelectorAll('.playlist-list-content li');
        for (let x = 0; x < allList.length; x++)
            allList[x].style.backgroundColor = "transparent";

        PlaylistSongs.current[index].style.background = '#4b4b8963'

        setCurrentSong({
            ...CurrentSong,
            name: document.querySelectorAll('.playlist-list-content li')[index].childNodes[1].childNodes[0].textContent,
            album_artist: document.querySelectorAll('.playlist-list-content li')[index].childNodes[1].childNodes[1].textContent,
            length: document.querySelectorAll('.playlist-list-content li')[index].childNodes[2].textContent,
            image: songData.image,
        });
        setSong(songData.url);
    }

    useEffect(() => {
        axios.get('/api/songs').then(res => {
            if (res.data.status === 200) {
                setSongs(res.data.songs);
            }
        });

    }, []);
    useEffect(()=>{
        axios.get('/api/song/latest').then(res => {
            if (res.data.status === 200) {
                setCurrentSong(res.data.song);
                setSong(`http://localhost:8000${res.data.song.hash_key}`);
                setPlaylistLoading(false);
            }
        })
    },[]);

    let display_playlist = "";
    if (Playlistloading) {
        return (<div className="col-6 p-0">
            <div className="main-playlist p-2">
                    <LinearProgress />
            </div>
        </div>)
    } else {
        display_playlist = songs.map((song, index) => {
            return (
                <li key={song.id} onClick={() => PlayNow(index)} ref={el => (PlaylistSongs.current[index] = el)}
                    data-url={`http://localhost:8000` + song.hash_key} data-image={song.image}>
                    <span><img src={song.image ? `http://localhost:8000` + song.image : DefaultImg} alt=""/></span>
                    <span>
                        <span className="d-block">{song.name.replace(/\.[^/.]+$/, "")}</span>
                        <span className="text-muted">{song.album_artist}</span>
                    </span>
                    <span>{song.length.replace(/\.[^/.]+$/, "")}</span>
                </li>
            )
        });
    }

    return (
        <React.Fragment>
            <Player Song={Song} CurrentSong={CurrentSong}/>
            <div className="col-6 p-0">
                <div className="main-playlist p-2">
                    <h6 className="text-center">
                        <FontAwesomeIcon icon="list"/>&nbsp;Playlist</h6>
                    <div className="playlist-list">
                        <ul className="playlist-list-content">
                            {display_playlist ?? ""}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Playlist;
