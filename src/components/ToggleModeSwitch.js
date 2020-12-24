import React from "react";
import { BsMoon } from "react-icons/bs";

import { Theme } from "../context/ThemeContext";
import "../style/toggle_switch.css";

const ToggleModeSwitch = () => {
  const [darkMode, setDarkMode] = Theme();
  return (
    <div>
      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => {
            setDarkMode(!darkMode);
            localStorage.setItem("darktheme", !darkMode);
          }}
        />
        <span className="slider round">
          <BsMoon className="theme-moon" />
        </span>
      </label>
    </div>
  );
};

export default ToggleModeSwitch;
