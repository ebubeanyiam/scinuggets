import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { IoIosTrendingUp } from "react-icons/io";

import { db } from "../../firebase/config";
import { timeToRead } from "./Functions";

import "../../style/homepage/trending_posts.css";

const TrendingPosts = ({ setTrend }) => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("postViews", "desc")
      .limit(3)
      .get()
      .then((snapshots) => {
        setTrendingPosts([...snapshots.docs]);
      });
  }, []);

  useEffect(() => {
    const trends = [];
    trendingPosts.forEach((post) => {
      trends.push(post.id);
    });
    setTrend(trends);
  }, [trendingPosts, setTrend]);

  return (
    <div className="homepage__trending-container">
      <div className="homepage__trending-posts">
        <div className="trending-posts__marker">
          <IoIosTrendingUp />
          <h3>TRENDING</h3>
        </div>
        <div className="trending-posts__container">
          {trendingPosts &&
            trendingPosts.map((post, index) => (
              <Link key={index} to={post.data().slug}>
                <div className="trending-posts__post">
                  <div className="trending-posts__author--ft-img">
                    {post.data().featuredImage !== "" && (
                      <img src={post.data().featuredImage} alt="" />
                    )}
                    <span>{post.data().authorName}</span>
                  </div>
                  <h1 className="trending-posts__title">{post.data().title}</h1>
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
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPosts;
