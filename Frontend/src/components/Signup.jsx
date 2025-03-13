import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc"
export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/auth/register", {username, email, password}, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            if(res.status === 200) {
                alert("Signup successful");
                navigate("/otp", { state: { email } });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
      <div className="form-container sign-up-container">
        <form onSubmit={signupHandler}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
              <FcGoogle size={30}/>
            </a>
            {/* <a href="#" className="social">
              <i className="fab fa-linkedin-in" />
            </a> */}
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Userame"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button>Sign Up</button>
        </form>
      </div>
    );
    
}

