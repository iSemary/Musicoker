import {Link, useNavigate} from "react-router-dom";
import Logo from "../assets/img/Logo.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faHeadphones, faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

library.add(faHeadphones, faSignInAlt);

function Header() {
    const navigate = useNavigate();

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

    const LogOutSubmit = (e) => {
        e.preventDefault()
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/logout').then(res => {
                if (res.data.status === 200) {
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('auth_username');
                    Toast.fire({
                        icon: 'success',
                        title: 'Logout Successfully'
                    });
                    navigate('/login');
                } else {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something Went Wrong!'
                    });
                }
            });
        });
    }

    let AuthButtons = '';
    if (!localStorage.getItem('auth_token')) {
        AuthButtons = (
            <>
                <Link to="/login" className="nav-sub-link">Login</Link>
                <Link to="/register" className="nav-sub-link">Register</Link>
            </>
        )
    } else {
        AuthButtons = (
            <>
                <Link to="/song/create" className="nav-sub-link">Add Song</Link>
                <button type="button" className="nav-sub-link" onClick={LogOutSubmit}>Logout</button>
            </>
        );
    }

    return (
        <header className="container">
            <div className="row">
                <div className="col-6">
                    <Link to="/" className="nav-main-link"><img src={Logo} className="top-logo"
                                                                alt=""/> Musicoker</Link>
                </div>
                <div className="col-6">
                    {AuthButtons}
                </div>
            </div>
        </header>
    );
}

export default Header;
