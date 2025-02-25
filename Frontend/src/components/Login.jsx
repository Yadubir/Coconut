import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    const signinHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {email, password}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if(res.status === 200) {
              localStorage.setItem("token", res.data.token);
                notifyLogin();
                setLoggedIn(true);
                setTimeout(() => {
                    navigate("/", { state: { loggedIn: true } });
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const notify = () => toast('Email sent successfully');
    const notifyLogin = () => toast('Signin successful', {duration: 2000});

    const handleForgotPassword = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:3000/api/auth/forgotpass", {email}, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        });
        console.log(res.message);
        if(res.status === 200) {
          notify();
          // navigate("resetpass");
          // alert("Email sent successfully");
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="form-container sign-in-container">
      <Toaster />
      <form onSubmit={signinHandler}>
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          {/* <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a> */}
        </div>
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a onClick={handleForgotPassword} href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};

