import React, { useState } from "react";

import { User } from "../context/UserContext";

import Hero from "./Hero";
import Header from "./Header";

import "../style/homepage.css";

const HomePage = () => {
  const user = User();
  const [dropDown, setDropDown] = useState(false);

  return (
    <div
      className="homepage"
      onClick={(e) => {
        !e.target.classList.contains("header__menu--dropdown") &&
          dropDown &&
          setDropDown(false);
      }}
    >
      <Header dropDown={dropDown} setDropDown={setDropDown} />
      {user === "" ? "Loading" : user === null ? <Hero /> : "For you"}
    </div>
  );
};

export default HomePage;
