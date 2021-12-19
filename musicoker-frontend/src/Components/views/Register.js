import React, {Component, useState} from 'react';
import RegisterImage from '../../assets/img/register.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faLock, faEnvelope, faAt, faMale, faFemale, faBirthdayCake, faIdCard
} from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'

library.add(faLock, faEnvelope, faAt, faMale, faFemale, faBirthdayCake, faIdCard);

function Register() {
    const navigate = useNavigate();
    const [RegisterInput, setRegister] = useState({
        'first_name': '',
        'last_name': '',
        'email': '',
        'username': '',
        'dateofbirth': '',
        'gender': '',
        'password': '',
        're_password': '',
        'error_list':[]
    })

    const HandleInput = (e) => {
        setRegister({...RegisterInput, [e.target.name]: e.target.value});
    }

    const RegisterSubmit = (e) => {
        e.preventDefault()
        const user = {
            first_name: RegisterInput.first_name,
            last_name: RegisterInput.last_name,
            email: RegisterInput.email,
            username: RegisterInput.username,
            dateofbirth: RegisterInput.dateofbirth,
            gender: RegisterInput.gender,
            password: RegisterInput.password,
            re_password: RegisterInput.re_password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', user).then(res => {
                if (res.data.status === 200) {
                    // Remove Double Quotes
                    localStorage.setItem('auth_token', JSON.stringify(res.data.token).slice(1, -1));
                    localStorage.setItem('auth_username', JSON.stringify(res.data.username));

                    new Swal('success', 'Done', 'success');

                    navigate('/');
                } else {
                    setRegister({...RegisterInput,error_list:res.data.validation_errors});
                }
            });
        });
    }

    return (
        <div className="form-holder container mt-2 d-flex p-3">
            <div className="form-image">
                <img src={RegisterImage} alt=""/>
            </div>
            <div className="form-container">
                <form action="" onSubmit={RegisterSubmit}>
                    <p className="text-center">
                        Create Account at Musicoker
                    </p>
                    <div className="row">
                        <div className="col-6 form-group">
                            {/*<label htmlFor="">First Name</label>*/}
                            <div className="position-relative">
                                <input type="text" placeholder="First Name" name="first_name"
                                       value={RegisterInput.first_name} onChange={HandleInput}/>
                                <FontAwesomeIcon icon="id-card"/>
                            </div>
                            <span>{RegisterInput.error_list.first_name}</span>
                        </div>
                        <div className="col-6 form-group">
                            {/*<label htmlFor="">Last Name</label>*/}
                            <div className="position-relative">
                                <input type="text" placeholder="Last Name" name="last_name"
                                       value={RegisterInput.last_name} onChange={HandleInput}/>
                                <FontAwesomeIcon icon="id-card"/>
                            </div>
                            <span>{RegisterInput.error_list.last_name}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="">Mail</label>*/}
                        <div className="position-relative">
                            <input type="email" placeholder="Mail" name="email" value={RegisterInput.email}
                                   onChange={HandleInput}/>
                            <FontAwesomeIcon icon="envelope"/>
                        </div>
                        <span>{RegisterInput.error_list.email}</span>
                    </div>
                    <div className="form-group">
                        {/*<label htmlFor="">Username</label>*/}
                        <div className="position-relative">
                            <input type="text" placeholder="Username" name="username" value={RegisterInput.username}
                                   onChange={HandleInput}/>
                            <FontAwesomeIcon icon="at"/>
                        </div>
                        <span>{RegisterInput.error_list.username}</span>
                    </div>
                    <div className="row">
                        <div className="col-6 form-group">
                            {/*<label htmlFor="">Birth-of-date</label>*/}
                            <div className="position-relative">
                                <input type="date" name="dateofbirth" value={RegisterInput.dateofbirth}
                                       onChange={HandleInput}/>
                                <FontAwesomeIcon icon="birthday-cake"/>
                            </div>
                            <span>{RegisterInput.error_list.dateofbirth}</span>
                        </div>
                        <div className="col-6 form-group">
                            {/*<label htmlFor="">Gender</label>*/}
                            <div className="position-relative">
                                <select name="gender" value={RegisterInput.gender}
                                        onChange={HandleInput}>
                                    <option>Choose Gender</option>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                </select>
                                <FontAwesomeIcon icon="male" style={{left: '20px'}}/>
                                <FontAwesomeIcon icon="female"/>
                            </div>
                            <span>{RegisterInput.error_list.gender}</span>
                        </div>
                    </div>
                    <div className="form-group">
                        {/*<label htmlFor="">Password</label>*/}
                        <div className="position-relative">
                            <input type="password" placeholder="Password" name="password"
                                   value={RegisterInput.password} onChange={HandleInput}/>
                            <FontAwesomeIcon icon="lock" style={{color: "#ffc107"}}/>
                        </div>
                        <span>{RegisterInput.error_list.password}</span>
                    </div>

                    <div className="form-group">
                        {/*<label htmlFor="">Re-Password</label>*/}
                        <div className="position-relative">
                            <input type="password" placeholder="Re-Password" name="re_password"
                                   value={RegisterInput.re_password} onChange={HandleInput}/>
                            <FontAwesomeIcon icon="lock" style={{color: "#ffc107"}}/>
                        </div>
                        <span>{RegisterInput.error_list.re_password}</span>
                    </div>
                    <div className="form-group mt-2">
                        <button className="btn btn-success d-block" type="submit">Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register