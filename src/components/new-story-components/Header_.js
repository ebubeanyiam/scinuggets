import React from "react";

import { BsThreeDots } from "react-icons/bs";

import DropDown from "./DropDown";
import LoggedInHeader from "../header-components/LoggedInHeader";

import "../../style/header.css";
import ToggleModeSwitch from "../ToggleModeSwitch";

const Header = (props) => {
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

          {props.saving && (
            <div className="header__logo--greeting">
              <h1>Saving</h1>
            </div>
          )}
        </div>

        <div style={styles}>
          <div style={styles}>
            <BsThreeDots
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.setDropDown(!props.dropDown);
              }}
            />
            {props.dropDown && <DropDown />}
          </div>
          <LoggedInHeader
            dropDown={props.menuDropDown}
            setDropDown={props.setMenuDropDown}
            user={props.user}
          />
          <ToggleModeSwitch />
        </div>
      </nav>
    </div>
  );
};

export default Header;
