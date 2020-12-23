import React from "react";

import "../style/toggle_switch.css";

const ToggleModeSwitch = () => {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleModeSwitch;
