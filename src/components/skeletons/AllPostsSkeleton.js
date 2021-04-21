import React from "react";

import "../../style/skeletons/allposts_skeleton.css";

const AllPostsSkeleton = () => {
  return (
    <div className="all-posts_skeleton">
      <div className="all-posts_skeleton--article-container">
        <div className="all-posts_skeleton--flex">
          <div className="skeleton skeleton-image-author"></div>
          <div className="skeleton skeleton-name"></div>
        </div>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-subtitle"></div>
        <div className="skeleton skeleton-article-info"></div>
      </div>
      <div className="all-posts_skeleton--article-image">
        <div className="skeleton skeleton-image-article"></div>
      </div>
    </div>
  );
};

export default AllPostsSkeleton;
