import React from "react";
import { Link } from "react-router-dom";

import { User } from "../../context/UserContext";
import LoggedInHeader from "../header-components/LoggedInHeader";
import LoggedOutHeader from "../header-components/LoggedOutheader";

import "../../style/header.css";
import { useEffect } from "react";
import { useState } from "react";

const Header = ({ saving }) => {
  const user = User();

  return (
    <div className="header__container">
      <nav className="header">
        <div className="header__logo">
          <h1>Drafts</h1>

          {saving && (
            <div className="header__logo--greeting">
              <h1>Saving</h1>
            </div>
          )}
        </div>

        {!user ? <LoggedOutHeader /> : <LoggedInHeader />}
      </nav>
    </div>
  );
};

export default Header;
