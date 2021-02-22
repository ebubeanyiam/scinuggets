import React, { useState, useEffect } from "react";
import { getUserId } from "./profile-components/ProfileProviders";

import AuthorCard from "./profile-components/AuthorCard";
import ScreenLoader from "./ScreenLoader";

import "../style/profile.css";

const Profile = (props) => {
  const [profileData, setProfileData] = useState({});
  const [id, setId] = useState(props.match.params.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserId(id, setProfileData, setLoading);
  }, [id]);

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <div className="profile">
      <AuthorCard data={profileData} />
      Hello World
    </div>
  );
};

export default Profile;
