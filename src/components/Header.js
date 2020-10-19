import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Header = () => {
  const user = useContext(UserContext);

  return (
    <nav>
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
              to={user ? "/logout" : "/signup"}
              className="header__menu--container__link"
            >
              {user ? "Log Out" : "Sign Up"}
            </Link>
          </li>
          <li>
            <Link to="" className="header__menu--container__link--button">
              Get Started
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
