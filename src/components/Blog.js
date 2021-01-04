import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import readingTime from "reading-time";
import { BsBookmark } from "react-icons/bs";
import { VscComment } from "react-icons/vsc";
import { IoMdHeartEmpty } from "react-icons/io";

import { getAuthorDetails } from "./Logic";

import { getPostById } from "./new-story-components/FunctionProvider";

import Header from "./Header";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

import { User } from "../context/UserContext";
import { getHTMLData, calcLike, calcSaves } from "./blog-components/Functions";
import DefaultProfile from "../assets/images/default_profile-img.png";

import "../style/blog.css";

const Blog = (props) => {
  const user = User();
  const [dropDown, setDropDown] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlData, setHtmlData] = useState("");
  const [postLikes, setPostLikes] = useState(0);
  const [postSaves, setPostSaves] = useState(0);
  const [postComments, setPostComments] = useState(0);

  const [likedPost, setLikedPost] = useState(false);
  const [savedPost, setSavedPost] = useState(false);

  const [authorDetails, setAuthorDetails] = useState({});

  const args = {
    props,
    user,
    likedPost,
    setLikedPost,
    postLikes,
    setPostLikes,
    postSaves,
    setPostSaves,
    savedPost,
    setSavedPost,
  };

  useEffect(() => {
    getPostById(props.match.params.id, setPostData, setLoading);
  }, [props.match.params.id]);

  useEffect(() => {
    if (postData) {
      getHTMLData(postData, setHtmlData);
      getAuthorDetails(postData.postedBy, setAuthorDetails);
      setPostLikes(postData.likes);
      setPostSaves(postData.saved);
      setPostComments(postData.commentsCount);

      if (postData.likedBy.includes(user.uid)) {
        setLikedPost(true);
      }

      if (postData.savedBy.includes(user.uid)) {
        setSavedPost(true);
      }
    }
  }, [postData, user]);

  if (loading) {
    return <ScreenLoader />;
  } else if (postData === false) {
    return <PageNotFound />;
  } else {
    return (
      <>
        <div
          className={`${props.darkMode && "bg-mode--dark"} blog`}
          onClick={(e) => {
            !e.target.classList.contains("header__menu--dropdown") &&
              dropDown &&
              setDropDown(false);
          }}
        >
          <Header dropDown={dropDown} setDropDown={setDropDown} />
          <div className="blog__header-container">
            <div className="blog__header">
              <div className="profile">
                {/* <Link to="/">
                  <h1>Category</h1>
                </Link> */}
              </div>
              <div className="header__actions">
                {user && user.uid === postData.postedBy && (
                  <button>Edit</button>
                )}
              </div>
            </div>
          </div>

          <div className="blog__article-container">
            <aside className="blog__story-component">
              <div className="blog__story-comp-card-container">
                <div className="blog__story-comp-card">
                  <IoMdHeartEmpty
                    style={{ color: likedPost && "red" }}
                    onClick={() => {
                      calcLike(args);
                    }}
                  />
                  <span>{postLikes}</span>
                </div>

                <div className="blog__story-comp-card">
                  <VscComment />
                  <span>{postComments}</span>
                </div>

                <div className="blog__story-comp-card">
                  <BsBookmark
                    style={{ color: savedPost && "purple" }}
                    onClick={() => {
                      calcSaves(args);
                    }}
                  />
                  <span>{postSaves}</span>
                </div>
              </div>
            </aside>

            <div className="blog__article">
              <div className="blog__article-header">
                <h1>{postData.title}</h1>
              </div>

              <div className="blog__article-subtitle">
                <h3>{postData.subtitle}</h3>
              </div>

              <div className="blog__article-details">
                <div className="blog__article-details--user">
                  <div className="user-image">
                    {authorDetails.photoUrl ? (
                      <img src={authorDetails.photoUrl} alt="author" />
                    ) : (
                      <img src={DefaultProfile} alt="author" />
                    )}
                  </div>
                  <div className="article-time-details">
                    <div className="article-time-details--author">
                      <span>
                        {authorDetails.displayName && authorDetails.displayName}
                      </span>
                    </div>
                    <div className="article-time-details--time">
                      <span>
                        {
                          <Moment fromNow>
                            {new Date(postData.timestamp.seconds * 1000)}
                          </Moment>
                        }{" "}
                        .
                      </span>
                      <span>{readingTime(htmlData).text}</span>
                    </div>
                  </div>
                </div>

                <div className="blog__article-details--social"></div>
              </div>

              <div className="blog__article-featured-image">
                {postData.featuredImage && (
                  <img src={postData.featuredImage} alt="featured" />
                )}
              </div>

              <div
                className="blog__article-text"
                dangerouslySetInnerHTML={{ __html: htmlData }}
              ></div>

              <div className="blog__article-tags">
                {postData.tags &&
                  postData.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
              </div>
            </div>
          </div>

          <div className="blog__author-component">
            <div className="blog__author-image-container">
              {authorDetails.photoUrl ? (
                <img src={authorDetails.photoUrl} alt="author" />
              ) : (
                <img src={DefaultProfile} alt="author" />
              )}
            </div>
            <div className="blog__author-about-container">
              <span>WRITTEN BY</span>
              <div className="blog__author-about-container__author-name">
                <h3>
                  {authorDetails.displayName && authorDetails.displayName}
                </h3>
                <button>Follow</button>
              </div>
              <div className="blog__author-about-container__bio">
                <span>{authorDetails.bio && authorDetails.bio}</span>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
};

export default Blog;
