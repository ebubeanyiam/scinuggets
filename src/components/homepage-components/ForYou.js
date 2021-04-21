import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { db } from "../../firebase/config";
import { timeToRead } from "./Functions";

import DefaultUser from "../../assets/images/default_profile-img.png";

import "../../style/homepage/for_you.css";
import ForYouSkeleton from "../skeletons/ForYouSkeleton";
import ForYouMainSkeleton from "../skeletons/ForYouMainSkeleton";

const ForYou = ({ trend, setCustom }) => {
  const [posts, setPosts] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [allAuthors, setAllAuthors] = useState([]);
  const [mainPost, setMainPost] = useState([]);
  const [postSliced, setPostSliced] = useState([]);

  useEffect(() => {
    if (trend.length !== 0) {
      db.collection("posts")
        .where("slug", "not-in", trend)
        .where("featuredImageIsSet", "==", true)
        .limit(5)
        .get()
        .then((snapshots) => {
          setPosts([...snapshots.docs]);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }, [trend]);

  useEffect(() => {
    setMainPost(posts.slice(0, 1));
    setPostSliced(posts.slice(1));
  }, [posts]);

  useEffect(() => {
    db.collection("users")
      .where("postsNum", ">", 0)
      .get()
      .then((snapshots) => {
        setAllAuthors([...snapshots.docs]);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  useEffect(() => {
    if (allAuthors.length !== 0) {
      const numStart = Math.floor(Math.random() * (allAuthors.length - 1));
      setAuthors(allAuthors.slice(numStart, numStart + 2));
    }
  }, [allAuthors]);

  return (
    <div className="homepage__custom-posts--container">
      <div className="homepage__custom-posts">
        <div className="homepage__custom-post--main-container">
          {mainPost.length > 0
            ? mainPost.map((post, index) => (
                <Link key={index} to={post.data().slug}>
                  <div className="homepage__custom-post--main">
                    <div className="homepage__custom-post--post-image">
                      {post.data().featuredImage && (
                        <img src={post.data().featuredImage} alt="featured" />
                      )}
                    </div>
                    <div className="homepage__custom-post--main-post-info">
                      <div className="homepage__custom-post__main-post-author--ft-img">
                        <img
                          src={
                            post.data().authorImage !== ""
                              ? post.data().authorImage
                              : DefaultUser
                          }
                          alt="author"
                        />
                        <span>{post.data().authorName}</span>
                      </div>
                      <h1 className="homepage__all-posts__title">
                        {post.data().title}
                      </h1>
                      {post.data().subtitle && (
                        <p className="homepage__all-posts__subtitle">
                          {post.data().subtitle}
                        </p>
                      )}
                      <div className="trending-posts__time">
                        <span>
                          {
                            <Moment fromNow>
                              {new Date(post.data().timestamp.seconds * 1000)}
                            </Moment>
                          }
                          .
                        </span>
                        <span>{timeToRead(post.data().savedData)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            : [1].map((skeleton) => <ForYouMainSkeleton key={skeleton} />)}
        </div>

        <div className="homepage__custom-posts-container-other-posts">
          {postSliced.length > 0
            ? postSliced.map((post, index) => (
                <Link key={index} to={post.data().slug}>
                  <div className="homepage__custom-posts--post">
                    <div className="homepage__all-posts--post-info">
                      <div className="homepage__all-posts__author--ft-img">
                        <img
                          src={
                            post.data().authorImage !== ""
                              ? post.data().authorImage
                              : DefaultUser
                          }
                          alt="author"
                        />
                        <span>{post.data().authorName}</span>
                      </div>
                      <h1 className="homepage__custom-posts__title">
                        {post.data().title}
                      </h1>
                      <div className="trending-posts__time">
                        <span>
                          {
                            <Moment fromNow>
                              {new Date(post.data().timestamp.seconds * 1000)}
                            </Moment>
                          }
                          .
                        </span>
                        <span>{timeToRead(post.data().savedData)}</span>
                      </div>
                    </div>
                    <div className="homepage__custom-posts--post-image">
                      {post.data().featuredImage && (
                        <img src={post.data().featuredImage} alt="featured" />
                      )}
                    </div>
                  </div>
                </Link>
              ))
            : [1, 2, 3, 4].map((skeleton) => <ForYouSkeleton key={skeleton} />)}
        </div>

        <div className="homepage__custom-posts-writers">
          <div className="homepage__custom-posts-writers-child">
            <h1 className="homepage__custom-posts--marker">
              WRITERS TO FOLLOW
            </h1>
            <div className="homepage__custom-posts--writer-box-container">
              {authors.length !== 0 &&
                authors.map((author, index) => (
                  <div
                    className="homepage__custom-posts--writer-box"
                    key={index}
                  >
                    <div className="homepage__custom-posts--writer-box-bio">
                      {author.data().photoUrl && (
                        <Link to={`/profile/${author.data().username}`}>
                          <img src={author.data().photoUrl} alt="writer" />
                        </Link>
                      )}
                      <div className="homepage__custom-posts--writer-box-bio-about">
                        {author.data().displayName && (
                          <h5>{author.data().displayName}</h5>
                        )}
                        {author.data().bio && <span>{author.data().bio}</span>}
                      </div>
                    </div>
                    <div className="homepage__custom-posts--writer-box-follow">
                      <button>Follow</button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="homepage__custom-posts-writers-child">
            <h1 className="homepage__custom-posts--marker">TOPICS TO FOLLOW</h1>
            <div className="homepage__custom-posts--topics-container">
              <div className="homepage__custom-posts--topic-box">
                <h3>Coronavirus</h3>
                <button>Follow</button>
              </div>
              <div className="homepage__custom-posts--topic-box">
                <h3>Programming</h3>
                <button>Follow</button>
              </div>
              <div className="homepage__custom-posts--topic-box">
                <h3>Javascript</h3>
                <button>Follow</button>
              </div>
              <Link to="/">
                <span>See More</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
