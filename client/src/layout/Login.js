import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [is_valid_email, setValidEmail] = useState("false");
    const history = useNavigate();

    const handleEmailValidation = (e) => {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmail(e.target.value)
        if (e.target.value.match(mailFormat)) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
       console.log(password)
    }
    const handleLogin = () => {
        let data = {
            email,
            password
        }
        if (email !== "" && password !== "") {
            axios({
                method: "POST",
                url: "http://localhost:5000/user/login",
                data: data
            })
                .then(res => {
                    if (res.data) {
                        window.sessionStorage.setItem("token", res.data.token)
                        window.sessionStorage.setItem("user_data", JSON.stringify(res.data))
                        history("/Home")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert("Please enter email and password")

        }
    }
    console.log(is_valid_email)
    return (
        <div className="container-fluid login_container">
            <div className="row justify-content-center">
                <div className="col-sm-4 mt-5">
                    <h2 className="text-center ">Login</h2>
                    <div className="card bg-success">
                        <div className="card-body">
                            <input type="email" className="form-control mt-3"
                                onChange={(e) => handleEmailValidation(e)} placeholder="Enter your email" />
                            {email !== "" && is_valid_email !== true && <div className="text-danger">Please enter valid email</div>}
                            <input type="password" className="form-control mt-3"
                                onChange={(e) => handlePassword(e)} placeholder="Enter your password" />
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary  mt-4" onClick={(e) => handleLogin(e)}>Login</button>
                            </div>

                            <div className="text-center">if you are new here
                                <NavLink to="/Register" className="link" >Register</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;