import React, { useState, useEffect } from "react";

import AuthorCard from "./profile-components/AuthorCard";

import "../style/profile.css";

const Profile = (props) => {
  const [id, setId] = useState(props.match.params.id);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="profile">
      <AuthorCard id={id} />
      Hello World
    </div>
  );
};

export default Profile;
