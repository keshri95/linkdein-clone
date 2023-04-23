import React, { useMemo, useState } from 'react'
import "./index.scss";
import {AiOutlineLike, AiFillLike, AiOutlineComment} from "react-icons/ai"
import { getLikesByUser, likePost, postComment } from '../../../api/FirestoreAPI';
import {getCurrentTimeStamp } from "../../../helpers/useMoment"

export default function LikeButton({ userId, postId }) {


    const [likesCount, setLikesCount]  = useState(0)
    const [liked, setLiked] = useState(false)
    const [showCommentBox, setShowCommentBox] = useState(false)
    const [comment, setComment] = useState('')

    const  handleLike = () => {
        likePost(userId, postId, liked)
    }

    const getComment = (event) => {
      setComment(event.target.value)
    }

    const addComment = () => {
      postComment(postId, comment, getCurrentTimeStamp('LLL'))
        setComment('')
    }

    useMemo(() => {

      getLikesByUser(userId, postId, setLiked, setLikesCount)

    }, [userId, postId])

  return (
    <div className='like-container' onClick={handleLike}> 

      <p> {likesCount} People Like this Post </p> 

        <div className='hr-line'>
          <hr />
        </div>

      <div className='like-comment' >

      <div className='likes-comment-inner' onClick={handleLike}>
       { 
        liked ? (
          <AiFillLike size={30} 
            color='#0072b1' /> 
        ): (
         <AiOutlineLike size={30} />
         )}

          <p className={liked ? "blue":"black"}>Like</p>
      </div>


      <div className='likes-comment-inner' onClick={() => setShowCommentBox(true)}>
          <AiOutlineComment size={30} color={showCommentBox ? "0072b1" : "#212121"} /> 
          <p className={showCommentBox ? "blue":"black"}>Comment</p>
      </div>

    </div>
      {showCommentBox ?  (<>
        <input placeholder='Add a Comment' className='comment-input' onChange={getComment}
        name='comment'
        value={comment}
        />
        <button className='add-a-comment-btn' onClick={addComment}>Add a Comment</button>
        </>):
        (
          <>

          </>
        )  
      }
    </div>
  )
}
