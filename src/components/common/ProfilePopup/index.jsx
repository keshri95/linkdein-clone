import React from 'react'
import "./index.scss";
import { onLogout } from '../../../api/AuthAPI'; 

export default function ProfilePopup() {
  return (
    <div className='popup-card'>
        <ul className='popup-option'>
            <li className='popup-option' onClick={onLogout}>Logout</li>
        </ul>
    </div>
  )
}
