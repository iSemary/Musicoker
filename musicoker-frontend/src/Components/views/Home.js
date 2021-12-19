import React from "react";
import Player from "../Player";
import Playlist from "../Playlist";
import Wave from '../../assets/img/Wave.svg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faFacebook, faLinkedin, faGithub,faLaravel,faReact
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebook, faLinkedin, faGithub,faLaravel,faReact);

function Home() {
    return (
        <>
            <div className="svg-background">
                <div className="musicoker-container">
                    <img src={Wave} className="wave-l" alt=""/>
                    <div className="row">
                        <Player/>
                        <Playlist/>
                    </div>
                    <img src={Wave} className="wave-r" alt=""/>
                </div>
                <div className="home-footer">
                    <div className="container">
                        <div className="top-footer row">
                            <div className="col-4">
                                <p className="m-0">
                                    Musicoker | Simple music player with an open-source code.<br/>
                                    © 2021
                                </p>
                            </div>
                            <div className="col-4">
                                <p className="m-0">
                                    Made by &#9829; by Abdelrahman Samir <br/>
                                    Technologies Used :<br/>
                                    <div className="used-icons">
                                        <a href="https://facebook.com/semary.l" target="_blank" rel="noreferrer" style={{color:'#F22C1F'}}>
                                            <FontAwesomeIcon icon={["fab", "laravel"]}/>
                                        </a>
                                        <a href="https://linkedin.com/in/iSemary" target="_blank" rel="noreferrer" style={{color:'#5CCFEE'}}>
                                            <FontAwesomeIcon icon={["fab", "react"]}/>
                                        </a>
                                    </div>
                                </p>
                            </div>
                            <div className="col-4 social-icons d-flex">
                                <a href="https://facebook.com/semary.l" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={["fab", "facebook"]}/>
                                </a>
                                <a href="https://linkedin.com/in/iSemary" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={["fab", "linkedin"]}/>
                                </a>
                                <a href="https://github.com/iSemary" target="_blank" rel="noreferrer">
                                    <FontAwesomeIcon icon={["fab", "github"]}/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home