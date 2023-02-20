import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [is_valid_email, setValidEmail] = useState("false");

    const history = useNavigate();


    const handleName = (e) => {
        setName(e.target.value)
    }
    // const handleEmail = (e) => {
    //     setEmail(e.target.value)
    // }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleEmailValidation=(e)=>{
        var mailFormat= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        setEmail(e.target.value)
        if(e.target.value.match(mailFormat)){
            setValidEmail(true)
        }else{
            setValidEmail(false)
        }
    }
    const handleRegister = () => {
        const data = {
            name: name,
            email: email,
            password: password
        }
        if (email !== "" && password !== "") {

            axios({
                method: "POST",
                url: "http://localhost:5000/user/register",
                data: data
            })
                .then(res => {
                    console.log(res.data)
                    history("/Login")

                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            alert("Email and Password is required")
        };
    };
    return (
        <div className="container-fluid register_container">
            <div className="row justify-content-center">
                <div className="col-sm-8 ">
                    <div className="card bg-info mt-5">
                        <div className="card-body bg-secondary my-3">
                            <h1 className="text-center my-3">Register</h1>
                            <input type="email" className="form-control mt-3"
                                placeholder="Enter your name" onChange={(e) => handleName(e)} />
                            <input type="email" className="form-control mt-3"
                                placeholder="Enter your email" onChange={(e) => handleEmailValidation(e)} />
                                {email !== "" && is_valid_email !== true && <div className ="text-danger">Please enter valid Email </div>}
                            <input type="password" className="form-control mt-3"
                                placeholder="Password" onChange={(e) => handlePassword(e)} />
                            <div className="text-center my-3">
                                <button className="btn btn-primary"
                                    //disabled={!(email !== "") && !(password !== "")} 
                                    onClick={(e) => handleRegister(e)}>Register</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;