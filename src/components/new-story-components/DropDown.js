import React from "react";

const DropDown = ({ setFile, setPostImage }) => {
  return (
    <div className="header__menu--dropdown">
      <div className="header__menu--dropdown--user-options">
        <span>Add to series</span>
        <span>Share draft link</span>
        <form>
          <label>
            <span>Select featured Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => console.log("df kjdn")}
              style={{ display: "none" }}
            />
          </label>
        </form>

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
