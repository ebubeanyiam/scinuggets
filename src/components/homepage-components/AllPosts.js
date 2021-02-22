import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { db } from "../../firebase/config";
import { timeToRead } from "./Functions";

import DefaultUser from "../../assets/images/default_profile-img.png";
import "../../style/homepage/all_posts.css";

const AllPosts = ({ trend }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (trend.length !== 0) {
      db.collection("posts")
        .where("slug", "not-in", trend)
        .get()
        .then((snapshots) => {
          setPosts([...snapshots.docs]);
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
          {posts &&
            posts.map((post, index) => (
              <Link key={index} to={post.data().slug}>
                <div className="homepage__all-posts--post">
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
                  <div className="homepage__all-posts--post-image">
                    {post.data().featuredImage && (
                      <img src={post.data().featuredImage} alt="featured" />
                    )}
                  </div>
                </div>
              </Link>
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

export default AllPosts;
