import React, {Component, useState} from 'react';
import axios from "axios";
import {BrowserRouter} from "react-router-dom";


export default class SandboxGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
            name: '',
            size: ''
        };

    }

    HandleInput = (e) => {
    }
    HandleFileInput = (e) => {
        this.setState({song: e.target.files[0]});
    };
    HandleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("song", this.state.song);
        formData.append("name", this.state.name);

        const headers = {
            "Content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
        }

        axios.post('/api/song/store', formData, {headers}).then(res => {
            console.log(res)
        });
    }

    render() {
        return (
            <div className="site-content">
            <div className="container">
                <form onSubmit={this.HandleSubmit} encType="multipart/form-data">
                    <div className="card">
                        <div className="card-header">
                            Add Song
                        </div>

                        <div className="card-body">
                            <div className="form-group">
                                <label>Upload Song File</label><br/>
                                <input type="file" name="song"
                                       onChange={this.HandleFileInput}/>
                            </div>
                            <div className="form-group">
                                <label>Song Name</label>
                                <input type="text" name="name" className="form-control"  value={this.state.name}
                                       onChange={this.HandleInput}/>
                            </div>
                            <div className="form-group">
                                <label>Song Size</label>
                                <input type="text" name="size" className="form-control" disabled value={this.state.size}
                                       onChange={this.HandleInput}/>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success">
                                Add Song
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

