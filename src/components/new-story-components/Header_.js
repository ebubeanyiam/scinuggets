import React from "react";

import { BsThreeDots } from "react-icons/bs";

import DropDown from "./DropDown";
import LoggedInHeader from "../header-components/LoggedInHeader";

import "../../style/header.css";

const Header = ({ dropDown, setDropDown, saving, setFile, setPostImage }) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    position: "relative",
  };

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

        <div style={styles}>
          <div>
            <BsThreeDots
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDropDown(!dropDown);
              }}
            />
            {dropDown && (
              <DropDown setFile={setFile} setPostImage={setPostImage} />
            )}
          </div>
          <LoggedInHeader />
        </div>
      </nav>
    </div>
  );
};

export default Header;
