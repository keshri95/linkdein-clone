import React, { useState } from "react";
import "../Sass/LoginComponent.scss";
import { LoginAPI } from "../api/AuthAPI";

export default function LoginComponent() {
  const [credentials, setCredentials] = useState({});

  const login = async () => {
    try{
      let res = await LoginAPI(credentials.email, credentials.password);
      console.log(res?.user);

    } catch(err){
      console.log(err.errors.message)
    }

  };

  return (
    <div>
      <h1>LoginComponent</h1>
      <input
        className="common-input"
        placeholder="Enter your Email"
        onChange={(event) =>
          setCredentials({ ...credentials, email: event.target.value })
        }
      />

      <input
        className="common-input"
        placeholder="Enter your Password"
        onChange={(event) =>
          setCredentials({ ...credentials, password: event.target.value })
        }
      />

      <button className="login-btn" onClick={login}>
        Log in to LinkdeIn
      </button>
    </div>
  );
}
