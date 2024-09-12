import React, { useState } from 'react';
import '../User/Login.css'
import Logo from '../../Images/logo.jfif'
import backgroundimg from '../../Images/login-logo3.jfif'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function LoginForm() {

    // Initialize state with empty strings

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handlChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const requestData = new FormData();
            requestData.append("email", formData.email);
            requestData.append("password", formData.password);

            const response = await axios.post("http://localhost:8080/api/v1/login", requestData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Success:', response.data);

            setMessage("user Login Successfully! 😁");
            localStorage.setItem("user", JSON.stringify({ ...response.user, password: "" }));

            navigate('/home');
            //clear form inputs
            setFormData({
                email: "",
                password: "",
            });
        } catch (error) {
            console.log(error);
            setMessage("Incorrect Email & Password 😢")
        }
    };

    return (
        <>
            <section style={{ backgroundColor: "#673ab782" }}>

                <div class="container py-3 ">
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col col-sm-8">
                            <div class="card" style={{ borderRadius: "1rem" }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-md-5 d-none d-md-block">
                                        <img src={backgroundimg}
                                            alt="login form" class="img-fluid background-img" style={{ borderRadius: '1rem 0 0 1rem' }} />
                                    </div>
                                    <div class="col-md-6 col-md-5 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">

                                            <form onSubmit={handleLogin}>


                                                <div class="d-flex align-items-center mb-3 pb-1">
                                                    <i class="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                                                    <span class="h1 fw-bold mb-0"><img class="login-logo" src={Logo}></img></span>
                                                </div>

                                                <h5 class="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Sign into your account</h5>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="email" name="email" value={formData.email} id="form2Example17" class="form-control form-control-lg" onChange={handlChange} required />
                                                    <label class="form-label" for="form2Example17">Email address</label>
                                                </div>

                                                <div data-mdb-input-init class="form-outline mb-4">
                                                    <input type="password" name="password" value={formData.password} onChange={handlChange} id="form2Example27" class="form-control form-control-lg" required />
                                                    <label class="form-label" for="form2Example27">Password</label>
                                                </div>

                                                <div class="pt-1 mb-4">
                                                    <button data-mdb-button-init data-mdb-ripple-init class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
                                                </div>

                                                {message && <p>{message}</p>}

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default LoginForm;
