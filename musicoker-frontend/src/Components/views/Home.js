import React from "react";
import Player from "../Player";
import Playlist from "../Playlist";
function Home() {
    return (
        <div className="row">
            <Player />
            <Playlist />
        </div>
    );
}

export default Home