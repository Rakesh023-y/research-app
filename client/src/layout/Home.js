import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Sidebar from "./Sidebar";

const Home = () => {
    const history = useNavigate();

    const token = window.sessionStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            console.log("Token is not present")
            history("/login")
        }
    }, []);

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row d-flex">
                    <div className="col-sm-2 bg-secondary">
                        <Sidebar />
                       </div>
                       <div className="col-sm-10">
                        <div className="text">
                            <h1 className="text-center ">Welcome To Our Enterprises</h1>
                            <marquee direction="right"> <h2 className="text-center text-primary">We are here to help you grow</h2>
                            </marquee>
                            <p className="text-center "><strong>We believe in Smart Work</strong></p>
                            </div>
                            <div className="img-container">
                            <img className="img" src="https://thumbs.dreamstime.com/z/businessman-engineer-working-hands-business-people-join-hand-together-businessman-engineer-working-hands-business-146099061.jpg" />
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <h2 className="">Find and Join the Perfect Job <br />With Us</h2>
                    <div className="btn">
                    <button className="btn btn-outline-success my-3">Contact Us</button>
                    <div className="para">
                    <p><strong>Follow Us On</strong></p>

                    <div className="logo">
                                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                                <a href="#" className="fa fa-facebook"></a>
                                <a href="#" className="fa fa-twitter"></a>
                                <a href="#" className="fa fa-linkedin"></a>
                                <a href="#" className="fa fa-instagram"></a>
                                <a href="#" className="fa fa-google"></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home;