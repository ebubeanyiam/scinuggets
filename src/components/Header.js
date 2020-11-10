import React from "react";
import { Link } from "react-router-dom";

import { User } from "../context/UserContext";
import { getTime } from "../static/staticData";
import LoggedInHeader from "./header-components/LoggedInHeader";
import LoggedOutHeader from "./header-components/LoggedOutheader";

import "../style/header.css";

const Header = () => {
  const user = User();

  return (
    <div className="header__container">
      <nav className="header">
        <div className="header__logo">
          <Link to="/">
            <h1>Scinuggets</h1>
          </Link>

          {user && (
            <div className="header__logo--greeting">
              <h1>{getTime()}</h1>
            </div>
          )}
        </div>

        {!user ? <LoggedOutHeader /> : <LoggedInHeader />}
      </nav>
    </div>
  );
};

export default Header;
