import React from "react";
import "./assets/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Login from "./Components/views/Login"
import Register from "./Components/views/Register"
import Home from "./Components/views/Home"
import AddMusic from "./Components/views/AddMusic"
import UpdateMusic from "./Components/views/UpdateMusic"



function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
