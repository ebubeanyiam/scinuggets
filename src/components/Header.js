import React from "react";
import { AuthStatus } from "../context/AuthStatusContext";
import { AuthModal } from "../context/AuthModalContext";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

import "../style/header.css";

const Header = () => {
  const [, setAuthStatus] = AuthStatus();
  const [, setAuthModal] = AuthModal();

  return (
    <div className="header__container">
      <nav className="header">
        <div className="header__logo">
          <h1>Scinuggets</h1>
        </div>

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
              <Link
                to=""
                className="header__menu--container__link"
                onClick={() => {
                  setAuthModal(true);
                  setAuthStatus("Login");
                }}
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="header__menu--container__link--button"
                onClick={() => {
                  setAuthModal(true);
                  setAuthStatus("Signup");
                }}
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
