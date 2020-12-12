import React from "react";

import { BsThreeDots } from "react-icons/bs";

import { InputModel } from "./InputModel";

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

const DropDown = ({ setFile, setPostImage }) => {
  return (
    <div className="header__menu--dropdown">
      <div className="header__menu--dropdown--user-options">
        <span>Add to series</span>
        <span>Share draft link</span>
        <InputModel setFile={setFile} setPostImage={setPostImage} />
        <span>Change title/subtitle</span>
      </div>

      <div className="header__menu--dropdown--user--others">
        <span to="">Become a Member</span>
        <span to="">Help</span>
      </div>
    </div>
  );
};

export default Header;
