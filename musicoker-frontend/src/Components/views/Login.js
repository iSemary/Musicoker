import React, {Component, useState} from 'react';
import LoginImage1 from '../../assets/img/LoginImage1.jpg'
import LoginImage2 from '../../assets/img/LoginImage2.jpg'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios'
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faAt, faLock
} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

library.add(faLock, faAt);

function Login() {
    const navigate = useNavigate();
    const [LoginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
        wrong_error: ''
    });

    const HandleInput = (e) => {
        setLogin({...LoginInput, [e.target.name]: e.target.value});
    }
    const LoginSubmit = (e) => {
        e.preventDefault()
        const data = {
            email: LoginInput.email,
            password: LoginInput.password,
        }
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        axios.get('/sanctum/csrf-cookie').then(response => {

            axios.post('/api/login', data).then(res => {
                if (res.data.status === 200) {
                    // Remove Double Quotes
                    localStorage.setItem('auth_token', JSON.stringify(res.data.token).slice(1, -1));
                    localStorage.setItem('auth_username', JSON.stringify(res.data.username));
                    Toast.fire({
                        icon: 'success',
                        title: 'Signed in successfully'
                    });

                    navigate('/');
                } else if (res.data.status === 401) {
                    Toast.fire({
                        icon: 'error',
                        title: res.data.message
                    });
                } else {
                    setLogin({...LoginInput, error_list: res.data.validation_errors});
                }
            });
        });
    }
    return (
        <div className="form-holder login-form-holder container mt-2 d-flex p-3">
            <div className="form-image">
                <img src={LoginImage1} alt=""/>
            </div>
            <div className="form-container login-form">
                <form onSubmit={LoginSubmit}>
                    <p className="text-center">
                        Login at Musicoker
                    </p>
                    <div className="form-group">
                        <div className="position-relative">
                            <input type="email" placeholder="Mail" name="email"
                                   value={LoginInput.email} onChange={HandleInput}/>
                            <FontAwesomeIcon icon="envelope"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="position-relative">
                            <input type="password" placeholder="Password" name="password"
                                   value={LoginInput.password} onChange={HandleInput}/>
                            <FontAwesomeIcon icon="lock" style={{color: "#ffc107"}}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <span>{LoginInput.error_list.email ?? LoginInput.error_list.password}
                        </span>
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-primary d-block" type="submit">Login</button>
                    </div>
                </form>

            </div>
            <div className="second-form-image">
                <img src={LoginImage2} alt=""/>
            </div>
        </div>
    );
}

export default Login