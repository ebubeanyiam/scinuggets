import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import DefaultUser from "../../assets/images/default_profile-img.png";

import { UserData } from "../../context/UserContext";
import { auth } from "../../firebase/config";

const DropDown = ({ profileImage }) => {
  const userData = UserData();
  return (
    <div className="header__menu--dropdown">
      <div className="header__menu--dropdown--user">
        <img
          src={profileImage !== "" ? profileImage : DefaultUser}
          alt="logged in user"
        />
      </div>

      <div className="header__menu--dropdown--user-options">
        <Link to="/m/new-story">New Story</Link>
        <Link to="">Stories</Link>
        <Link to={`/profile/${userData.username}`}>Profile</Link>
        <Link to="/me/settings">Settings</Link>
      </div>

      <div className="header__menu--dropdown--user--personal">
        <Link to="">Reading List</Link>
        <Link to="">Publications</Link>
        <Link to="">Customize your interests</Link>
        <Link to="">Become a Partner</Link>
      </div>

      <div className="header__menu--dropdown--user--others">
        <Link to="">Become a Member</Link>
        <Link to="">Help</Link>
        <span
          onClick={() => {
            auth.signOut();
          }}
        >
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default DropDown;
