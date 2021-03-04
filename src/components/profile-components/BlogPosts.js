import React from "react";
import { Link } from "react-router-dom";

const BlogPosts = ({ data }) => {
  return (
    <div className="profile__blogposts">
      <div className="profile__blogpost">
        {data.map((post, index) => (
          <Link to={`/${post.data().slug}`} key={index}>
            <p>{post.data().subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
