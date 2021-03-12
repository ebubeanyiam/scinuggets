import React, { useEffect, useState } from "react";

import { User } from "../context/UserContext";

import Hero from "./homepage-components/Hero";
import Header from "./Header";
import Footer from "./Footer";
import TrendingPosts from "./homepage-components/TrendingPosts";

import "../style/homepage.css";
import AllPosts from "./homepage-components/AllPosts";
import ForYou from "./homepage-components/ForYou";

const HomePage = () => {
  const user = User();
  const [trend, setTrend] = useState([]);
  const [custom, setCustom] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homepage">
      {user === null ? (
        <Hero />
      ) : (
        <ForYou trend={trend} setCustom={setCustom} />
      )}
      <TrendingPosts setTrend={setTrend} />
      <AllPosts custom={custom} trend={trend} />
      <Footer />
    </div>
  );
};

export default HomePage;
