import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  fetchMore,
  getUserInfo,
  getUserPosts,
} from "./profile-components/ProfileProviders";

import AuthorCard from "./profile-components/AuthorCard";
import ScreenLoader from "./ScreenLoader";
import PageNotFound from "./PageNotFound";
import Footer from "./Footer";

import "../style/profile.css";
import BlogPosts from "./profile-components/BlogPosts";

const Profile = (props) => {
  const [profileData, setProfileData] = useState({});
  const [id, setId] = useState(props.match.params.id);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const args = {
    setProfileData,
    userId,
    setLoading,
    setId,
    setBlogPosts,
    lastDoc,
    setLastDoc,
  };

  useEffect(() => {
    db.collection("usernames")
      .doc(id)
      .get()
      .then((doc) => {
        setUserId(doc.data().userId);
        getUserInfo(doc.data().userId, args);
        getUserPosts(doc.data().userId, args);
      })
      .catch((e) => {
        setLoading(false);
        setProfileData(false);
      });
  }, [id]);

  useEffect(() => {
    setLastDoc(blogPosts[blogPosts.length - 1]);
  }, [blogPosts]);

  const fetchPosts = () => {
    fetchMore(args, userId, lastDoc);
  };

  if (loading) {
    return <ScreenLoader />;
  } else if (profileData === false) {
    return <PageNotFound warning={"User Not Found"} />;
  }

  return (
    <>
      <div className="profile">
        <div className="profile-container">
          {profileData && <AuthorCard data={profileData} />}
          {blogPosts && <BlogPosts data={blogPosts} />}
          <span className="profile__postFetch" onClick={fetchPosts}>
            Show more
          </span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
