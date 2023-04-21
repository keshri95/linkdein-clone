import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onLogout } from "../../../api/AuthAPI";
import { getCurrentUser } from "../../../api/FirestoreAPI";
import "./index.scss";

export default function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="popup-card">
      {/* <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p> */}
      <ul className="popup-option">
        <li className="popup-option" onClick={() => navigate("/profile")}>
          Profile
        </li>
        <li className="popup-option" onClick={onLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
}
