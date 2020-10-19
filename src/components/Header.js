import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

import "../style/header.css";

const Header = ({ setAuth, authStatus }) => {
  const user = useContext(UserContext);

  return (
    <div className="header__container">
      <nav className="header">
        <div className="header__logo">
          <h1>Scinuggets</h1>
        </div>

        <div className="header__menu">
          <ul className="header__menu--container">
            <li>
              <Link to="" className="header__menu--container__link">
                Our story
              </Link>
            </li>
            <li>
              <Link to="" className="header__menu--container__link">
                Membership
              </Link>
            </li>
            <li>
              <Link to="" className="header__menu--container__link">
                Write
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="header__menu--container__link"
                onClick={() => {
                  setAuth(true);
                  authStatus("Login");
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
                  setAuth(true);
                  authStatus("Signup");
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
