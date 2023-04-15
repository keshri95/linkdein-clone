import React, { useState } from "react";
import "../Sass/LoginComponent.scss";
import { LoginAPI, GoogleSignInAPI, RegisterAPI } from "../api/AuthAPI";
import LinkdeinLogo from "../assets/link.png"
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterComponent(){
    const [credentials, setCredentials] = useState({});
    let navigate = useNavigate()
  
    const login = async () => {
      try{
        let res = await RegisterAPI(credentials.email, credentials.password);
        console.log(res?.user);
        toast.success('Account Created!')
        navigate("/home")
      } catch (err){
        console.log(err);
        toast.error("Connot create your Account");
      }
  
    };
  
  
    const googleSignIn = () => {
      let response = GoogleSignInAPI()
      console.log(response)
      navigate("/home")
    }
  return (
    <div className="login-wrapper">
    <img src={LinkdeinLogo} className="linkedinLogo" />

    <div className="login-wrapper-inner">
      <h1 className="heading">Make the most of your professional life</h1>

      <div className="auth-inputs">
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, name: event.target.value })
          }
          type="text"
          className="common-input"
          placeholder="Your Name"
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
          type="email"
          className="common-input"
          placeholder="Email or phone number"
        />
        <input
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })
          }
          type="password"
          className="common-input"
          placeholder="Password (6 or more characters)"
        />
      </div>
      <button onClick={login} className="login-btn">
        Agree & Join
      </button>
    </div>
    <hr class="hr-text" data-content="or" />
    <div className="google-btn-container">
      <GoogleButton className="google-btn" onClick={googleSignIn} />

      <p className="go-to-signup">
        New to LinkedIn?
        <span className="join-now" onClick={() => navigate("/register")}>
          Join now
        </span>
      </p>
    </div>
  </div>
  )
}
