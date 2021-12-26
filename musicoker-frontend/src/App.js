import React from "react";
import "./assets/App.css";
import {BrowserRouter, Routes, Navigate, Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/views/Login"
import Register from "./Components/views/Register"
import Home from "./Components/views/Home"
import AddSong from "./Components/views/AddSong"
import UpdateMusic from "./Components/views/UpdateMusic"

import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config
});

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                    <Routes>
                        <Route exact path="/" element={<Home/>}/>
                        <Route path="/login" element={localStorage.getItem('auth_token') ? <Navigate to='/'/>  : <Login/> }/>
                        <Route path="/register" element={localStorage.getItem('auth_token') ? <Navigate to='/'/>  : <Register/> }/>
                        <Route path="/song/create" element={localStorage.getItem('auth_token') ? <AddSong/> : <Navigate to='login'/>  }/>
                    </Routes>
                <Footer/>
            </BrowserRouter>

        </div>
    );
}

export default App;
