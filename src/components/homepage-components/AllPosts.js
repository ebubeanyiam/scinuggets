import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { db } from "../../firebase/config";
import { timeToRead } from "./Functions";

import DefaultUser from "../../assets/images/default_profile-img.png";
import "../../style/homepage/all_posts.css";
import AllPostsSkeleton from "../skeletons/AllPostsSkeleton";

const AllPosts = ({ trend }) => {
  const [posts, setPosts] = useState([]);
  const [lastPost, setLastPost] = useState();
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          db.collection("posts")
            .where("slug", "not-in", trend)
            .startAfter(lastPost)
            .limit(5)
            .get()
            .then((snapshots) => {
              setPosts((posts) => [...posts, ...snapshots.docs]);
              if (snapshots.docs.length > 0) {
                setLastPost(snapshots.docs[snapshots.docs.length - 1]);
              } else {
                setHasMore(false);
              }
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
        }
      });
      if (node) observer.current.observe(node);
    },
    [trend, lastPost, hasMore]
  );

  useEffect(() => {
    if (trend.length !== 0) {
      db.collection("posts")
        .where("slug", "not-in", trend)
        .limit(5)
        .get()
        .then((snapshots) => {
          setPosts([...snapshots.docs]);
          setLastPost(snapshots.docs[snapshots.docs.length - 1]);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  }, [trend]);

  return (
    <div className="homepage__all-posts_top-container">
      <div className="homepage__all-posts">
        <div className="homepage__all-posts--container">
          {posts.length > 0
            ? posts.map((post, index) => {
                if (posts.length === index + 1) {
                  return (
                    <Link key={index} to={post.data().slug} ref={lastPostRef}>
                      <PostDiv post={post} />
                    </Link>
                  );
                } else {
                  return (
                    <Link key={index} to={post.data().slug}>
                      <PostDiv post={post} />
                    </Link>
                  );
                }
              })
            : [1, 2, 3, 4, 5].map((skeleton) => (
                <AllPostsSkeleton key={skeleton} />
              ))}
        </div>

        <div className="homepage__all-posts--discover__container">
          <div className="homepage__all-posts--discover">
            <div className="homepage__all-posts--discover-topics">
              <div className="homepage__all-posts--discover-topics__header">
                <h2>EXPLORE TOPICS YOU ENJOY</h2>
              </div>

              <div className="homepage__all-posts--discover-topics__topics-container">
                <Link to="/">Fashion</Link>
                <Link to="/">Travel</Link>
                <Link to="/">Programming</Link>
                <Link to="/">Education</Link>
                <Link to="/">Javascript</Link>
                <Link to="/">Food</Link>
                <Link to="/">Politics</Link>
                <Link to="/">Machine Learning</Link>
                <Link to="/">Data Science</Link>
              </div>

              <div className="homepage__all-posts--discover-topics__exp-link">
                <span>
                  <Link to="/">Explore all topics</Link>
                </span>
              </div>
            </div>
            <div className="homepage__all-posts--discover__footer">
              <Link to="">Home</Link>
              <Link to="">Tags</Link>
              <Link to="">Code of Conduct</Link>
              <Link to="">FAQ</Link>
              <Link to="">Sponsors</Link>
              <Link to="">About</Link>
              <Link to="">Privacy Policy</Link>
              <Link to="">Terms of Use</Link>
              <Link to="">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostDiv = (props) => {
  return (
    <div className="homepage__all-posts--post">
      <div className="homepage__all-posts--post-info">
        <div className="homepage__all-posts__author--ft-img">
          <img
            src={
              props.post.data().authorImage !== ""
                ? props.post.data().authorImage
                : DefaultUser
            }
            alt="author"
          />
          <span>{props.post.data().authorName}</span>
        </div>
        <h1 className="homepage__all-posts__title">
          {props.post.data().title}
        </h1>
        {props.post.data().subtitle && (
          <p className="homepage__all-posts__subtitle">
            {props.post.data().subtitle}
          </p>
        )}
        <div className="trending-posts__time">
          <span>
            {
              <Moment fromNow>
                {new Date(props.post.data().timestamp.seconds * 1000)}
              </Moment>
            }
            .
          </span>
          <span>{timeToRead(props.post.data().savedData)}</span>
        </div>
      </div>
      <div className="homepage__all-posts--post-image">
        {props.post.data().featuredImage && (
          <img src={props.post.data().featuredImage} alt="featured" />
        )}
      </div>
    </div>
  );
};

export default AllPosts;
