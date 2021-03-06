import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch, AiOutlineBell } from "react-icons/ai";

import { db } from "../../firebase/config";

import DefaultUser from "../../assets/images/default_profile-img.png";

// import { auth } from "../../firebase/config";
import DropDown from "./DropDown";

const LoggedInHeader = ({ dropDown, setDropDown, user }) => {
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.data()) {
          setProfileImage(doc.data().photoUrl);
        }
      });
  }, [user]);

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
            <img
              src={profileImage !== "" ? profileImage : DefaultUser}
              alt="logged in user"
            />
            {/* <AiOutlineUser className="header__menu--container__link--icon" /> */}
            {dropDown && (
              <DropDown profileImage={profileImage} setDropDown={setDropDown} />
            )}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default LoggedInHeader;
