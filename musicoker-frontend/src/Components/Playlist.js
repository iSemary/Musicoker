import React, {useEffect, useRef, useState} from "react";
import Player from "./Player";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import DefaultImg from '../assets/img/default.jpg';
import {faList} from "@fortawesome/free-solid-svg-icons";

library.add(faList);
const axios = require('axios');

function Playlist() {

    const PlaylistSongs = useRef({});

    const [loading, setLoading] = useState(true);
    const [songs, setSongs] = useState([]);

    const PlayNow = (index) => {
        let nextSong = PlaylistSongs.current[index].dataset.url;

        let allList = document.querySelectorAll('.playlist-list-content li');
        for (let x = 0; x < allList.length; x++)
            allList[x].style.backgroundColor = "transparent";

        PlaylistSongs.current[index].style.background = '#4b4b8963'

        // console.log(pressedSong)

        return <Player nextSong="OKAY"/>;
    }

    useEffect(() => {
        axios.get('/api/songs').then(res => {
            if (res.data.status === 200) {
                setSongs(res.data.songs);
                setLoading(false);
            }
        });
    }, []);

    let display_playlist = "";
    if (loading) {
        return (<div className="col-6 p-0">
            <div className="main-playlist p-2">
                <h4 className="text-light text-center">Loading... Please Wait</h4>
            </div>
        </div>)
    } else {
        display_playlist = songs.map((song, index) => {
            return (
                <li key={song.id} onClick={() => PlayNow(index)} ref={el => (PlaylistSongs.current[index] = el)}
                    data-url={`http://localhost:8000` + song.hash_key}>
                    <span><img src={song.image ? `http://localhost:8000` + song.image : DefaultImg} alt=""/></span>
                    <span>
                        {song.name.replace(/\.[^/.]+$/, "")}<br/>
                        <span className="text-muted">{song.album_artist}</span>
                    </span>
                    <span>{song.length.replace(/\.[^/.]+$/, "")}</span>
                </li>
            )
        });
    }

    return (
        <React.Fragment>
            <div className="col-6 p-0">
                <div className="main-playlist p-2">
                    <h6 className="text-center">
                        <FontAwesomeIcon icon="list"/>&nbsp;Playlist</h6>
                    <div className="playlist-list">
                        <ul className="playlist-list-content">
                            {display_playlist}
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Playlist;
