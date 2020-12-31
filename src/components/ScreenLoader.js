import React from "react";

import Logo from "../assets/images/scinuggets_logo.png";

import "../style/screen_loader.css";

const ScreenLoader = () => {
  return (
    <div className="screen-loader-box__parent">
      <div className="screen-loader-box">
        <img src={Logo} alt="scinuggets logo" />
      </div>
    </div>
  );
};

export default ScreenLoader;
