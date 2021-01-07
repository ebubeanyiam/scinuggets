import React, { useState } from "react";

import { db } from "../firebase/config";
import { User } from "../context/UserContext";

import Hero from "./homepage-components/Hero";
import Header from "./Header";
import Footer from "./Footer";
import TrendingPosts from "./homepage-components/TrendingPosts";

import "../style/homepage.css";
import AllPosts from "./homepage-components/AllPosts";

const HomePage = () => {
  const user = User();
  const [dropDown, setDropDown] = useState(false);
  const [trend, setTrend] = useState([]);

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
      <TrendingPosts setTrend={setTrend} />
      <AllPosts trend={trend} />
      <Footer />
    </div>
  );
};

export default HomePage;
