import React from "react";
import MainPlayer from "../MainPlayer";
// import Player from "../Player";
// import Playlist from "../Playlist";
// import Wave from '../../assets/img/Wave.svg'
// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faFacebook, faLinkedin, faGithub, faLaravel, faReact
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faLinkedin, faGithub, faLaravel, faReact);

function Home() {
    return (
        <>
            <MainPlayer/>
        </>
    );
}

export default Home