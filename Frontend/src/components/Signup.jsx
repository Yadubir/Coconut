import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            }
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className="wrapper signUp">
      <div className="illustration">
        {/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
      </div>
      <div className="form">
        <div className="heading">CREATE AN ACCOUNT</div>
        <form>
          <div>
            <label htmlFor="name">Username</label>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="name" placeholder="Enter your username" />
          </div>
          <div>
            <label htmlFor="name">E-Mail</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="name" placeholder="Enter your mail" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              placeholder="Enter you password"
            />
          </div>
          <button onClick={signupHandler} type="submit">Submit</button>
        </form>
        
      </div>
    </div>
  );
}
