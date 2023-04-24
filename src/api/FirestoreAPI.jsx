import { firestore } from "../firebaseConfig";
import {
    addDoc,
    collection,
    onSnapshot,
    doc,
    updateDoc,
    query,
    where,
    setDoc,
    deleteDoc,
    orderBy,
    serverTimestamp,
  } from "firebase/firestore";
import {toast} from "react-toastify";



let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

// get status ===========
export const getStatus = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


// get all user data =============
export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


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
                return {  ...docs.data(), userID: docs.id };    // return { ...docs.data(), id: docs.id };
            }).filter((item) => {
                return item.email === localStorage.getItem('userEmail')
            })[0]
        )
    })
}


// edit profile ----------

export const editProfile = (userID, payload) => {
    let userToEdit = doc(userRef, userID)
    updateDoc(userToEdit, payload)
    .then(() => {
        toast.success("Profile has been updated successfully")
    })
    .catch((err) => {
        console.log(err)
    })
}

// single status data ===============
export const getSingleStatus = (setAllStatus, id) => {
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


// move another user post profile
export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(userRef, where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
      setCurrentUser(
        response.docs.map((docs) => {
          return { ...docs.data(), id: docs.id };
        })[0]
      );
    });
  };



  // like posts

  export const likePost = (userId, postId,liked) => {

    try{

      
      let docToLike = doc(likeRef, `${userId}_${postId}`)

      if(liked){
        deleteDoc(docToLike)
      } else{

        setDoc(docToLike, { userId, postId })
      }


    } catch(err) {
      console.log(err)
    }

  }


  // likes from the users

  export const getLikesByUser = (userId,postId, setLiked, setLikesCount) => {
    try{
      let likeQuery = query(likeRef, where('postId', '==', postId))
      onSnapshot(likeQuery, (response) => {
        let likes = response.docs.map((doc) => doc.data())
        
        let likesCount = likes?.length
        const isLiked = likes.some((like) => like.userId === userId)

        // console.log(likesCount)
        setLikesCount(likesCount)
        setLiked(isLiked)
      })    
    

    } catch(err) {
      console.log(err)
    }
  }


  // comment on the post

  export const postComment = (postId, comment, timeStamp, name) => {
    try{
      addDoc(commentsRef, {
        postId, 
        comment, 
        timeStamp,
        name,
      })  
    }  
     catch(err) {
      console.log(err)
    }
  }

  //  show the comments on the posts========
  export const getComments = (postId, setComments) => {
    try {
      let singlePostQuery = query(commentsRef, where("postId", "==", postId));
  
      onSnapshot(singlePostQuery, (response) => {
        const comments = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
  
        setComments(comments);
      });
    } catch (err) {
      console.log(err);
    }
  };