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

      <div className='profile-info'>

      <div>
        <h3 className='userName'>
        {
        Object.values(currentProfile).length === 0 
          ? currentUser.name
          : currentProfile?.name
        }
        </h3>

        <p className="heading">
          {Object.values(currentProfile).length === 0
            ? currentUser.headline
            : currentProfile?.headline}
        </p>

        <p className='location'>
          {
             Object.values(currentProfile).length === 0 
             ? `${currentUser.location},${currentUser.country}`
             : currentProfile?.location
          }
          </p>


          <a target='_blank' href={
            Object.values(currentProfile).length === 0
            ? `${currentUser.website}`
            : currentUser.website
          } className='website'>
          {
             Object.values(currentProfile).length === 0 
             ? `${currentUser.website}`
             : currentProfile?.website
          }
          </a>

        
      </div>

      <div className='right-info'>
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

        <p className='about-me'>
          {
             Object.values(currentProfile).length === 0 
             ? currentUser.abouMe
             : currentProfile?.abouMe
          }
          </p>
        
        <p className='skills'>
         <span className='skill-label'>Skills</span>:&nbsp;
        {
            Object.values(currentProfile).length === 0 
            ? currentUser.skills
            : currentProfile?.skills
        }
        </p>


      <div className='post-status-main'>

        {allStatus?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostCard posts={posts} />
            </div>
          );
        })}

      </div>

    </div>
    </>
  )
}
