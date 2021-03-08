import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { timeToRead } from "../homepage-components/Functions";

import "../../style/profile/blogposts.css";

const BlogPosts = ({ data }) => {
  return (
    <div className="profile__blogposts">
      {data.map((post, index) => (
        <Link to={`/${post.data().slug}`} key={index}>
          <div className="profile__blogpost">
            {post.data().featuredImage && (
              <img src={post.data().featuredImage} alt="" />
            )}
            <div className="profile__blogpost--info">
              <div>
                <h2>{post.data().title}</h2>
                <h4>{post.data().subtitle}</h4>
              </div>

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
  );
};

export default BlogPosts;
