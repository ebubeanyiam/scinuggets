import React from "react";

import "../../style/skeletons/for-you-main_skeleton.css";

const ForYouMainSkeleton = () => {
  return (
    <div className="for-you-main_skeleton">
      <div className="for-you-main_skeleton--article-image">
        <div className="skeleton skeleton-image-article-large"></div>
      </div>
      <div className="for-you-main_skeleton--flex">
        <div className="skeleton skeleton-image-author"></div>
        <div className="skeleton skeleton-name"></div>
      </div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-subtitle"></div>
      <div className="skeleton skeleton-article-info"></div>
    </div>
  );
};

export default ForYouMainSkeleton;
