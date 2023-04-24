import React, {useState, useMemo, useEffect} from 'react'
import "./index.scss";
import { getSingleUser, getSingleStatus, getStatus,editProfile } from '../../../api/FirestoreAPI';
import PostCard from '../PostCard';
import { useLocation } from 'react-router-dom';
import {FaBeer} from "react-icons/fa"
import {HiOutlinePencil} from "react-icons/hi"
import { uploadImage as uploadImageAPI } from '../../../api/ImageUpload';

export default function ProfileCard({currentUser,onEdit}) {
  let location = useLocation()
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentImage, setCurrentImage]  = useState({})
  const [imageLink, setImageLink] = useState('')

  const getImage =(event) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImage = () => {
    uploadImageAPI(currentImage, currentUser.id)
  }


  
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }

    getStatus(setAllStatus) // this should not be here 
  }, []);

  // console.log(currentUser)  // id
  /*
  useEffect(() => {
    editProfile(currentUser?.userID, imageLink)
  },[imageLink])

  */

  return (
    <>
   
    <div className="profile-card">
    <input type={"file"} onChange={getImage} />
    <button onClick={uploadImage}>Upload</button>
    <div className='edit-btn'>
        <HiOutlinePencil className='edit-icon' onClick={onEdit} />
      </div>

      <div className="profile-info">
        <div>
          <img className='profile-image' src={currentUser?.imageLink} alt="profile-image" />
          <h3 className="userName">
            {Object.values(currentProfile).length === 0
              ? currentUser.name
              : currentProfile?.name}
          </h3>

          <p className="heading">
            {Object.values(currentProfile).length === 0
              ? currentUser.headline
              : currentProfile?.headline}
          </p>


          {(currentUser.city || currentUser.country) &&
          (currentProfile?.city || currentProfile?.country) ? (
            <p className="location">
              {Object.values(currentProfile).length === 0
                ? `${currentUser.city}, ${currentUser.country} `
                : `${currentProfile?.city}, ${currentUser.country}`}
            </p>
          ) : (
            <></>
          )}
          {currentUser.website || currentProfile?.website ? (
            <a
              className="website"
              target="_blank"
              href={
                Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website
              }
            >
              {Object.values(currentProfile).length === 0
                ? `${currentUser.website}`
                : currentProfile?.website}
            </a>
          ) : (
            <></>
          )}
        </div>

        <div className="right-info">
          <p className="college">
            {Object.values(currentProfile).length === 0
              ? currentUser.college
              : currentProfile?.college}
          </p>
          <p className="company">
            {Object.values(currentProfile).length === 0
              ? currentUser.company
              : currentProfile?.company}
          </p>
        </div>
      </div>
      <p className="about-me">
        {Object.values(currentProfile).length === 0
          ? currentUser.aboutMe
          : currentProfile?.aboutMe}
      </p>

      {currentUser.skills || currentProfile?.skills ? (
        <p className="skills">
          <span className="skill-label">Skills</span>:&nbsp;
          {Object.values(currentProfile).length === 0
            ? currentUser.skills
            : currentProfile?.skills}
        </p>
      ) : (
        <></>
      )}
    </div>

    <div className="post-status-main">
      {allStatus?.map((posts) => {
        return (
          <div key={posts.id}>
            <PostCard posts={posts} />
          </div>
        );
      })}
    </div>

    </>

  )
}
