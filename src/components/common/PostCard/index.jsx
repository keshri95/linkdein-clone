import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { getCurrentUser } from "../../../api/FirestoreAPI";

export default function PostCard({ posts, id }) {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({})

  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  // console.log(currentUser?.userID) // id
  return (
    <div className="posts-card" key={id}>
    <p
      className="name"
      onClick={() =>
        navigate("/profile", {
          state: { id: posts?.userID, email: posts.userEmail },
        })
      }
    >
      {posts.userName}
    </p>
    <p className="timestamp">{posts.timeStamp}</p>
    <p className="status">{posts.status}</p>

    <LikeButton userId={currentUser?.userID} postId={posts.id} />
  </div>
  );
}
