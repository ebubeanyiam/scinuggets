import React, { useState, useEffect } from "react";
import { getUserId } from "./profile-components/ProfileProviders";

import AuthorCard from "./profile-components/AuthorCard";
import ScreenLoader from "./ScreenLoader";
import PageNotFound from "./PageNotFound";

import "../style/profile.css";
import BlogPosts from "./profile-components/BlogPosts";

const Profile = (props) => {
  const [profileData, setProfileData] = useState({});
  const [id, setId] = useState(props.match.params.id);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    getUserId(id, setProfileData, setLoading, setBlogPosts);
  }, [id]);

  console.log(blogPosts);

  if (loading) {
    return <ScreenLoader />;
  } else if (profileData === false) {
    return <PageNotFound warning={"User Not Found"} />;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <AuthorCard data={profileData} />
        {blogPosts && <BlogPosts data={blogPosts} />}
      </div>
    </div>
  );
};

export default Profile;
