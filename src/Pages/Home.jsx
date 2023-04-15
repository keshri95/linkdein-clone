import React, { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";


export default function Home() {
    const [loading, setLoading] = useState(true)
    let navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (res) => {
            // console.log(res?.accessToken)
            if(!res?.accessToken){
                navigate("/")
              } else{
                // return <Loader />
                setLoading(false)
              }
        })
    }, [])
  return loading ? <Loader /> : <HomeComponent />
}
