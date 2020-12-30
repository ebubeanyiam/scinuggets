import React from "react";
import { Link } from "react-router-dom";

import { AuthStatus } from "../../context/AuthStatusContext";
import { AuthModal } from "../../context/AuthModalContext";
import { auth } from "../../firebase/config";

const LoggedOutHeader = () => {
  const [, setAuthStatus] = AuthStatus();
  const [, setAuthModal] = AuthModal();

  return (
    <div className="header__menu">
      <ul className="header__menu--container">
        <li>
          <Link
            to=""
            className="header__menu--container__link"
            onClick={() => auth.signOut()}
          >
            Our story
          </Link>
        </li>
        <li>
          <Link to="" className="header__menu--container__link">
            Membership
          </Link>
        </li>
        <li>
          <Link to="/new-story" className="header__menu--container__link">
            Write
          </Link>
        </li>
        <li>
          <span
            className="header__menu--container__link"
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

export default LoggedOutHeader;
