import React, { useState } from "react";
import "./index.scss";
import linkdeinLogo from "../../../assets/link.png";

import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import user from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";

export default function Topbar() {
  let navigate = useNavigate();
  const [popupVisible, setPopupVisible] = useState(false);


  const goTo = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div className="topbar-main">
       {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}
      <img src={linkdeinLogo} alt="logo" className="linkdein-logo" />
      <div className="react-icons">
        <AiOutlineHome
          size={30}
          className="react-icon"
          onClick={() => goTo("/home")}
        />
        <AiOutlineUser
          size={30}
          className="react-icon"
          onClick={() => goTo("/profile")}
        />
        <BsBriefcase
          size={30}
          className="react-icon"
          onClick={() => goTo("/")}
        />
        <AiOutlineSearch
          size={30}
          className="react-icon"
          onClick={() => goTo("/")}
        />
        <AiOutlineMessage
          size={30}
          className="react-icon"
          onClick={() => goTo("/")}
        />
        <AiOutlineBell
          size={30}
          className="react-icon"
          onClick={() => goTo("/")}
        />
      </div>
      <img
        src={user}
        className="user-logo"
        alt="user"
        onClick={displayPopup}
      />
    </div>
  );
}
