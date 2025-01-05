import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    
  // return (
  //   <div className="wrapper signUp">
  //     <div className="illustration">
  //       {/* <img src="https://source.unsplash.com/random" alt="illustration" /> */}
  //     </div>
  //     <div className="form">
  //       <div className="heading">CREATE AN ACCOUNT</div>
  //       <form>
  //         <div>
  //           <label htmlFor="name">Username</label>
  //           <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" id="name" placeholder="Enter your username" />
  //         </div>
  //         <div>
  //           <label htmlFor="name">E-Mail</label>
  //           <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" id="name" placeholder="Enter your mail" />
  //         </div>
  //         <div>
  //           <label htmlFor="password">Password</label>
  //           <input
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //             type="password"
  //             id="password"
  //             placeholder="Enter you password"
  //           />
  //         </div>
  //         <button onClick={signupHandler} type="submit">Submit</button>
  //       </form>
        
  //     </div>
  //   </div>
  // );
}





// function SignUpForm() {
//   const [state, setState] = React.useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const handleChange = evt => {
//     const value = evt.target.value;
//     setState({
//       ...state,
//       [evt.target.name]: value
//     });
//   };

//   const handleOnSubmit = evt => {
//     evt.preventDefault();

//     const { name, email, password } = state;
//     alert(
//       `You are sign up with name: ${name} email: ${email} and password: ${password}`
//     );

//     for (const key in state) {
//       setState({
//         ...state,
//         [key]: ""
//       });
//     }
//   };

//   return (
//     <div className="form-container sign-up-container">
//       <form onSubmit={handleOnSubmit}>
//         <h1>Create Account</h1>
//         <div className="social-container">
//           <a href="#" className="social">
//             <i className="fab fa-facebook-f" />
//           </a>
//           <a href="#" className="social">
//             <i className="fab fa-google-plus-g" />
//           </a>
//           <a href="#" className="social">
//             <i className="fab fa-linkedin-in" />
//           </a>
//         </div>
//         <span>or use your email for registration</span>
//         <input
//           type="text"
//           name="name"
//           value={state.name}
//           onChange={handleChange}
//           placeholder="Name"
//         />
//         <input
//           type="email"
//           name="email"
//           value={state.email}
//           onChange={handleChange}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           name="password"
//           value={state.password}
//           onChange={handleChange}
//           placeholder="Password"
//         />
//         <button>Sign Up</button>
//       </form>
//     </div>
//   );
// }

