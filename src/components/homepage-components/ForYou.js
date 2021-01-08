import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { db } from "../../firebase/config";
import { timeToRead } from "./Functions";

import DefaultUser from "../../assets/images/default_profile-img.png";

import "../../style/homepage/for_you.css";

const ForYou = ({ trend, setCustom }) => {
  const [posts, setPosts] = useState([]);
  const [mainPost, setMainPost] = useState([]);
  const [postSliced, setPostSliced] = useState([]);

  console.log(posts);

  useEffect(() => {
    if (trend.length !== 0) {
      db.collection("posts")
        .where("featuredImage", "!=", true)
        // .where("slug", "not-in", trend)
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

  return (
    <div className="homepage__custom-posts--container">
      <div className="homepage__custom-posts">
        <div>
          {mainPost &&
            mainPost.map((post, index) => (
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
            ))}
        </div>

        <div>
          {postSliced &&
            postSliced.map((post, index) => (
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
        <div>Creaators to Follow</div>
      </div>
    </div>
  );
};

export default ForYou;
