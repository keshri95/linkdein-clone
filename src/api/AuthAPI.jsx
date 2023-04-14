import {signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../firebaseConfig"

// let auth = getAuth()

export const LoginAPI = (email, password) => {
  try {
   let response = signInWithEmailAndPassword(auth, email, password)
   return response
  } 
  catch(err){
    return err
    // alert(err.errors.message)
  }
}


export const RegisterAPI = (email, password) => {
  try{  
    let response = createUserWithEmailAndPassword(auth, email,password)
    return response
  } catch(err){
    return err
  }
}

export const GoogleSignInAPI = (email, password) => {
  try{

    let googleProvider = new GoogleAuthProvider()
    let res = signInWithPopup(auth, googleProvider)
    return res
  } catch (err){
    return err
  }
}
