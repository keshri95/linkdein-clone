import React, {useState, useMemo} from 'react'
import "./index.scss";
import { getSingleUser, getSingleStatus, getStatus } from '../../../api/FirestoreAPI';
import PostCard from '../PostCard';
import { useLocation } from 'react-router-dom';
import {FaBeer} from "react-icons/fa"
import {HiOutlinePencil} from "react-icons/hi"

export default function ProfileCard({currentUser, onEdit}) {
  let location = useLocation()
  const [allStatus, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({})

  
  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }

    getStatus(setAllStatus) // this should not be here 
  }, []);


  return (
    <>
   
    <div className="profile-card">

    <div className='edit-btn'>
        <HiOutlinePencil className='edit-icon' onClick={onEdit} />
        {/* <button onClick={onEdit}>Edit</button> */}
      </div>

      <div className="profile-info">
        <div>
          
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
