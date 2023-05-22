import React, { useState, useEffect } from 'react'
// import "../styles/login.css";
import {auth, provider} from "../firebase";
import {useNavigate} from "react-router-dom";
 
const Login = () => {
    const history = useNavigate();
    const [username, setname] = useState("");
    const [user, setUser] = useState({});

   const handleAuth =()=>{
      console.log('i am clicked');
      if(!username) {
        auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          const user = result.user;
          setUser(user);
          setname(user.displayName);
        })
        .catch((error) => {
          alert(error.message);
        });
      }
      else {
        auth.signOut.then(() => {
          setname("");
          history('/');
        });
      }
   };

   useEffect(()=> {
    if(username != "") {
      history('/landingpage', {state: {name: username, user: "Bharat"}});
    }
   }, [username])
  
  return (
    <div>
      <div className="container my-4"> 
        <div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>

          <button  onClick={handleAuth} type="submit" className="btn btn-outline-primary">Login</button>
        </div>
      </div>
    </div>

  )
}

export default Login
