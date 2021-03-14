import React from "react";

import "../../style/skeletons/for-you_skeleton.css";

const ForYouSkeleton = () => {
  return (
    <div className="for-you_skeleton">
      <div className="for-you_skeleton--article-container">
        <div className="for-you_skeleton--flex">
          <div className="skeleton skeleton-image-author"></div>
          <div className="skeleton skeleton-name"></div>
        </div>
        <div className="skeleton skeleton-title-small"></div>
        <div className="skeleton skeleton-article-info"></div>
      </div>
      <div className="for-you_skeleton--article-image">
        <div className="skeleton skeleton-image-article-small"></div>
      </div>
    </div>
  );
};

export default ForYouSkeleton;
