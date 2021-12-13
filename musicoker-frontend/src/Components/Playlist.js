import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faList } from "@fortawesome/free-solid-svg-icons";

library.add(faList);
function Playlist() {
    return (
        <>
            <div className="col-6">
                <div className="main-playlist p-2">
                    <h5 className="text-center">
                        <FontAwesomeIcon icon="list" />

                        Playlist</h5>

                    <div className="playlist-list">
                        <ul>
                            <li>
                                <span>
                                    Music Name Here
                                </span>
                                <small>
                                    02:45
                                </small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Playlist;
