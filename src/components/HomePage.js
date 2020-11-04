import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

import Hero from "./Hero";
import Header from "./Header";

import "../style/homepage.css";

const HomePage = () => {
  const user = useContext(UserContext);

  return (
    <div className="homepage">
      <Header />
      {user === "" ? "Loading" : user === null ? <Hero /> : "For you"}
    </div>
  );
};

export default HomePage;
