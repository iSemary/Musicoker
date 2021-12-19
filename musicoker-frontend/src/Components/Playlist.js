import React, {Component} from "react";
import DefaultImg from "../assets/img/default.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faList} from "@fortawesome/free-solid-svg-icons";

library.add(faList);

const axios = require('axios');

const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
    <li>{number}</li>
);

class Playlist extends Component {
    state = {
        songs: []
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="col-6 p-0">
                <div className="main-playlist p-2">
                    <h6 className="text-center">
                        <FontAwesomeIcon icon="list"/>&nbsp;Playlist</h6>

                    <div className="playlist-list">
                        <ul>
                            {listItems}
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                            <li><span>Music Name Here</span><span>02:45</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Playlist;
