import React, {Component} from "react";
import DefaultImg from '../assets/img/default.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faList,
    faStop,
    faStepForward,
    faStepBackward,
    faUndoAlt,
    faVolumeOff,
    faVolumeMute,
    faVolumeUp,
    faCompactDisc,
    faPause,
    faPlay
} from "@fortawesome/free-solid-svg-icons";

library.add(faList, faStop, faStepForward, faStepBackward, faUndoAlt, faVolumeOff, faVolumeMute, faVolumeUp, faCompactDisc, faPause, faPlay);

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            cover: DefaultImg,
            name: 'Current Music Name',
            artist: 'Artist Name',
            time:'03:24',
            playedTime: 4,
        };
    }

    render() {
        return (
            <div className="col-6 p-0">
                <div className="main-player p-2">
                    <div className="music-image">
                        <img src={this.state.cover} alt=""/>
                        <img src={this.state.cover} alt=""/>
                    </div>
                    <div className="music-info">
                        <h5 className="m-0">{this.state.name}</h5>
                        <p>{this.state.artist}</p>
                    </div>
                    <div className="music-progress">
                        <span>
                            {this.state.time}
                        </span>
                        <span>
                        <div className="track-progress">
                            <div className="track-child"></div>
                        </div>
                        </span>
                        <span>
                            {this.state.time}
                        </span>
                    </div>
                    <div className="player-buttons">
                        <span><FontAwesomeIcon icon="step-backward"/></span>
                        <span><FontAwesomeIcon icon="pause"/></span>
                        <span><FontAwesomeIcon icon="undo-alt"/></span>
                        <span className="play-button"><FontAwesomeIcon icon="play"/></span>
                        <span><FontAwesomeIcon icon="stop"/></span>
                        <span><FontAwesomeIcon icon="step-forward"/></span>
                        <span><FontAwesomeIcon icon="volume-up"/></span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
