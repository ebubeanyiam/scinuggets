import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import Hero from "./Hero";
import "../style/homepage.css";

const HomePage = () => {
  const user = useContext(UserContext);

  return (
    <div className="homepage">
      {user === "" ? "Loading" : user === null ? <Hero /> : "For you"}
    </div>
  );
};

export default HomePage;
