import React, { useState, useEffect } from "react";

import Header from "./Header";
import AuthorCard from "./profile-components/AuthorCard";

import "../style/profile.css";

const Profile = (props) => {
  const [id, setId] = useState(props.match.params.id);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="profile">
      <Header dropDown={dropDown} setDropDown={setDropDown} />
      <AuthorCard />
      Hello World
    </div>
  );
};

export default Profile;
