import React, { useEffect, useState } from "react";
import LoginComponent from "../components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader/index";
// import "index.scss"

export default function Login() {
  const [loading, setLoading] = useState(true)

  let navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      // console.log(res?.accessToken)
      if(res?.accessToken){
        navigate("/home")
      } else{
        setLoading(false)
        return <Loader />
      }
    })
  }, [])
  
  return loading ? <Loader /> : <LoginComponent />;
};