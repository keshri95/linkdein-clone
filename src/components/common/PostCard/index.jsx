import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { BsPencil, BsTrash  } from "react-icons/bs"
import { deletePost, getAllUsers, getCurrentUser } from "../../../api/FirestoreAPI";

export default function PostCard({ posts, id, getEditData }) {
  let navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);



  // console.log(allUsers.filter((user) => user.id === posts.userID)[0])

  /*
  console.log(
    allUsers
      .filter((item) => item.id === posts.userID)
      .map((item) => item.imageLink)[0]
  );
  */

  // console.log(currentUser?.userID) // id
  return (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">

        {currentUser.id === posts.userID ? (<div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>) : (
            <>
            </>
          )
          }

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
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>

          <p className="headline">
          {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
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
