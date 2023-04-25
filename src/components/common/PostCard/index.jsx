import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { getAllUsers, getCurrentUser } from "../../../api/FirestoreAPI";

export default function PostCard({ posts, id }) {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  console.log(
    allUsers
      .filter((item) => item.id === posts.userID)
      .map((item) => item.imageLink)[0]
  );

  // console.log(currentUser?.userID) // id
  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        <img
          className="post-image"
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          alt="profile-image"
        />

        <div>
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
        </div>
      </div>

      <p className="status">{posts.status}</p>

      <LikeButton
        userId={currentUser?.userID}
        postId={posts.id}
        currentUser={currentUser}
      />
    </div>
  );
}
