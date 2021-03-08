import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import readingTime from "reading-time";
import { Link } from "react-router-dom";
import { BsBookmark } from "react-icons/bs";
// import { VscComment } from "react-icons/vsc";
import { IoMdHeartEmpty } from "react-icons/io";

import { getAuthorDetails } from "./Logic";

import Header from "./Header";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

import DefaultProfile from "../assets/images/default_profile-img.png";

import { User } from "../context/UserContext";
import { AuthModal as AuthModalFunction } from "../context/AuthModalContext";

import {
  getHTMLData,
  calcLike,
  calcSaves,
  getPostById,
} from "./blog-components/Functions";

import "../style/blog.css";
import AuthModal from "./auth/AuthModal";
import { db, fieldValue } from "../firebase/config";

const Blog = (props) => {
  const user = User();
  const [, setAuthModal] = AuthModalFunction();

  const [dropDown, setDropDown] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlData, setHtmlData] = useState("");
  const [postLikes, setPostLikes] = useState(0);
  const [postSaves, setPostSaves] = useState(0);
  // const [postComments, setPostComments] = useState(0);

  const [likedPost, setLikedPost] = useState(false);
  const [savedPost, setSavedPost] = useState(false);

  const [authorDetails, setAuthorDetails] = useState({});
  const [loginAction, setLoginAction] = useState(false);

  const [morePosts, setMorePosts] = useState([]);

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
    setLoginAction,
  };

  useEffect(() => {
    getPostById(props.match.params.id, setPostData, setLoading);
  }, [props.match.params.id]);

  useEffect(() => {
    if (postData) {
      getHTMLData(postData, setHtmlData);
      getAuthorDetails(postData.postedBy, setAuthorDetails);
      setPostLikes(postData.likes.liked_by.length);
      setPostSaves(postData.saved.saved_by.length);

      db.collection("posts")
        .doc(props.match.params.id)
        .update({
          postViews: fieldValue.increment(1),
        });
      // setPostComments(postData.commentsCount);

      if (user) {
        postData.likes.liked_by.includes(user.uid) && setLikedPost(true);
        postData.saved.saved_by.includes(user.uid) && setSavedPost(true);
        setLoginAction(false);
      }
    }
  }, [postData, user, props.match.params.id]);

  useEffect(() => {
    if (!postData) {
      return;
    }

    const uid = postData.postedBy;
    const slug = postData.slug;

    db.collection("posts")
      .where("slug", "!=", slug)
      .where("postedBy", "==", uid)
      .limit(3)
      .get()
      .then((snapshots) => {
        setMorePosts([...snapshots.docs]);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  }, [postData]);

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
            loginAction &&
              e.target.classList.contains("auth-modal__modal__close-btn") &&
              setLoginAction(false);
            !e.target.classList.contains("header__menu--dropdown") &&
              dropDown &&
              setDropDown(false);
          }}
        >
          {loginAction && <AuthModal setAuth={setAuthModal} />}
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
                  <Link to={`/${postData.slug}/edit`}>
                    <button>Edit</button>
                  </Link>
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

                {/* <div className="blog__story-comp-card">
                  <VscComment />
                  <span>{postComments}</span>
                </div> */}

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

              {postData.edited && (
                <div className="blog__article--edited">
                  <span>
                    Last edited{" "}
                    {
                      <Moment>
                        {new Date(postData.lastEdited.seconds * 1000)}
                      </Moment>
                    }
                  </span>
                </div>
              )}

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

          <div className="blog__story-component--after">
            <div className="blog__story-comp-card--after">
              <IoMdHeartEmpty
                style={{ color: likedPost && "red" }}
                onClick={() => {
                  calcLike(args);
                }}
              />
              <span>
                {postLikes} {postLikes === 1 ? "like" : "likes"}
              </span>
            </div>

            {/* <div className="blog__story-comp-card">
                  <VscComment />
                  <span>{postComments}</span>
                </div> */}
          </div>

          <div className="blog__author-component">
            <div className="blog__author-image-container">
              <Link to={`/profile/${authorDetails.username}`}>
                {authorDetails.photoUrl ? (
                  <img src={authorDetails.photoUrl} alt="author" />
                ) : (
                  <img src={DefaultProfile} alt="author" />
                )}
              </Link>
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

          {morePosts && (
            <div className="blog__more-author-posts">
              <h3>More Posts from {authorDetails.displayName}</h3>
              {morePosts.map((post, index) => {
                // <Link to={post.data().slug} key={index}>
                //   <h1>{post.data().title}</h1>
                // </Link>;
              })}
            </div>
          )}

          <Footer />
        </div>
      </>
    );
  }
};

export default Blog;
