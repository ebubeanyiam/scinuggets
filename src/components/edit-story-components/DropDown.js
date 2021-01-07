import React from "react";

const DropDown = () => {
  return (
    <div className="header__menu--dropdown">
      <div className="header__menu--dropdown--user-options">
        <span>Add to series</span>
        <span>Share draft link</span>
        <span>Change title/subtitle</span>
      </div>

      <div className="header__menu--dropdown--user--others">
        <span to="">Become a Member</span>
        <span to="">Help</span>
      </div>
    </div>
  );
};

export default DropDown;
