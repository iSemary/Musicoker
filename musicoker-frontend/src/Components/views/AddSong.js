import React, {Component, useState} from 'react';
import axios from "axios";

export default class SandboxGet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            song: '',
            name: '',
            size: ''
        };
    }

    HandleInput = event => {
        // this.setState()
    }
    HandleFileInput = (e) => {
        this.setState({song: e.target.files[0]});
        console.log(this.state.song)
    };
    HandleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();

        formData.append("song", this.state.song);
        formData.append("name", this.state.name);
        console.log(this.state.song)

        console.log(formData);

        const headers = {
            "Content-type": "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
        }
        
        axios.post('/api/song/store', formData, {headers}).then(res => {
            console.log(res)
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.HandleSubmit} encType="multipart/form-data">
                    <div className="card">
                        <div className="card-header">
                            Add Song
                        </div>

                        <div className="card-body">
                            <div className="form-group">
                                <input type="file" name="song"
                                       onChange={this.HandleFileInput}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="name" value={this.state.name}
                                       onChange={this.HandleInput}/>
                            </div>
                            <div className="form-group">
                                <input type="text" name="size" value={this.state.size}
                                       onChange={this.HandleInput}/>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

