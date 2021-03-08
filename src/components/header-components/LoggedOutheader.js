import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

import { AuthStatus } from "../../context/AuthStatusContext";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/config";

const LoggedOutHeader = () => {
  const [, setAuthStatus] = AuthStatus();
  const [, setAuthModal] = AuthModal();
  const [dropDown, setDropDown] = useState(false);

  const styles = {
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

  return (
    <div className="header__menu">
      <div style={styles} className="header__menu--mobile">
        <BsThreeDots
          style={{ cursor: "pointer" }}
          onClick={() => {
            setDropDown(!dropDown);
          }}
        />
        {dropDown && <DropDown />}
      </div>
      <ul className="header__menu--container">
        <li>
          <Link
            to=""
            className="header__menu--container__link header__menu--container__link--d"
            onClick={() => auth.signOut()}
          >
            Our story
          </Link>
        </li>
        <li>
          <Link
            to=""
            className="header__menu--container__link header__menu--container__link--d"
          >
            Membership
          </Link>
        </li>
        <li>
          <Link
            to="/m/new-story"
            className="header__menu--container__link header__menu--container__link--d"
          >
            Write
          </Link>
        </li>
        <li>
          <span
            to=""
            className="header__menu--container__link header__menu--container__link--d"
            onClick={() => {
              setAuthModal(true);
              setAuthStatus("Login");
            }}
          >
            Sign In
          </span>
        </li>
        <li>
          <span
            to=""
            className="header__menu--container__link--button"
            onClick={() => {
              setAuthModal(true);
              setAuthStatus("Signup");
            }}
          >
            Get Started
          </span>
        </li>
      </ul>
    </div>
  );
};

const DropDown = () => {
  return (
    <div className="header__menu--dropdown">
      <div className="header__menu--dropdown--user-options">
        <span>Our Story</span>
        <span>Membership</span>
        <Link to="/m/new-story">
          <span>Write</span>
        </Link>
        <Link to="/s/signin">
          <span>Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default LoggedOutHeader;
