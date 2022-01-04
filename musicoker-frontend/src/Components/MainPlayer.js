import React from "react";
import Player from "./Player";
import Playlist from "./Playlist";
import Wave from '../assets/img/Wave.svg'

function MainPlayer() {
    return (
        <>
            <div className="svg-background">
                <div className="musicoker-container">
                    <img src={Wave} className="wave-l" alt=""/>
                    <div className="row">
                        <Playlist/>
                    </div>
                    <img src={Wave} className="wave-r" alt=""/>
                </div>
            </div>
        </>
    );
}

export default MainPlayer