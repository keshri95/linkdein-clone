import React, { useEffect, useState } from 'react'
import ProfileComponent from '../components/ProfileComponent'
import Loader from '../components/common/Loader'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'

export default function Profile({ currentUser} ) {

  const [loading, setLoading] = useState(true)
  let navigate = useNavigate();
  
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

  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />
}
