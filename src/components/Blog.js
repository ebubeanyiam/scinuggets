import React, { useEffect, useState } from "react";
import { getPostById } from "./new-story-components/FunctionProvider";

import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

const Blog = (props) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPostById(props.match.params.id, setPostData, setLoading);
  }, [props.match.params.id]);

  if (loading) {
    return <ScreenLoader />;
  } else if (postData === false) {
    return <PageNotFound />;
  } else {
    return <div>Hello World</div>;
  }
};

export default Blog;
