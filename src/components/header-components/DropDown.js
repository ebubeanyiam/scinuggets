import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";

import { auth } from "../../firebase/config";

const DropDown = () => {
  return (
    <div className="header__menu--dropdown">
      <div className="header__menu--dropdown--user">
        <AiOutlineUser />
      </div>

      <div className="header__menu--dropdown--user-options">
        <Link to="/m/new-story">New Story</Link>
        <Link to="">Stories</Link>
        <Link to="">Stats</Link>
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
