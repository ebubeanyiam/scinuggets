import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineBell, AiOutlineUser } from "react-icons/ai";

import { auth } from "../../firebase/config";
import DropDown from "./DropDown";

const LoggedInHeader = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div className="header__menu">
      <ul className="header__menu--container">
        {window.location.pathname === "/" && (
          <li className="header__menu--container__link">
            <AiOutlineSearch className="header__menu--container__link--icon" />
          </li>
        )}
        <li className="header__menu--container__link">
          <AiOutlineBell className="header__menu--container__link--icon" />
        </li>
        <li>
          <Link
            to=""
            className="header__menu--container__link--button__logged-in"
          >
            Upgrade
          </Link>
        </li>
        <li className="header__menu--container__link">
          <span
            onClick={() => {
              setDropDown(!dropDown);
            }}
          >
            <AiOutlineUser className="header__menu--container__link--icon" />
            {dropDown && <DropDown setDropDown={setDropDown} />}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default LoggedInHeader;
