import { firestore } from "../firebaseConfig";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import {toast} from "react-toastify";



let postRef = collection(firestore, "posts")
let userRef = collection(firestore, "users")

export const postStatus = (object) => {
    addDoc(postRef, object)
    .then(() => {
        toast.success("send successfully")
    })
    .catch((err) => {
        toast.error(err)
    })
}


// 

export const getStatus = (setAllStatus) => {
    onSnapshot(postRef, (response) => {
        setAllStatus(response.docs.map((docs) => {
            return {...docs.data(), id: docs.id }
        }))
    })
}


// post content of users 
export const postUserData =(object) => {
    addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
        console.log(err)
    })
}

// user data logged in details posted
export const getCurrentUser = (setCurrentUser) => {
    onSnapshot(userRef, (response) => {
        setCurrentUser(
            response.docs.map((docs) => {
                return {  ...docs.data(), userID: docs.id };
            }).filter((item) => {
                return item.email === localStorage.getItem('userEmail')
            })[0]
        )
    })
}
