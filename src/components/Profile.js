import React, { useState, useEffect } from "react";
import { getUserId } from "./profile-components/ProfileProviders";

import AuthorCard from "./profile-components/AuthorCard";
import ScreenLoader from "./ScreenLoader";
import PageNotFound from "./PageNotFound";

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
  } else if (profileData === false) {
    return <PageNotFound warning={"User Not Found"} />;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <AuthorCard data={profileData} />
      </div>
    </div>
  );
};

export default Profile;
