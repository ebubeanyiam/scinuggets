import React from "react";
import { Link } from "react-router-dom";

import "../style/page_not_found.css";

const PageNotFound = (props) => {
  return (
    <>
      <div className="page-not-found">
        <div className="page-not-found__error-warning">
          <h3>{props.warning ? props.warning : "Page Not Found"}</h3>
        </div>
        <div className="page-not-found__error-response">
          <h1>{props.response ? props.response : "404"}</h1>
        </div>
        <div className="page-not-found__error-header">
          <h2>You've stumbled upon a treasure that does not exist... Yet</h2>
        </div>
        <div className="page-not-found__error-message">
          <p>
            Finding great things on <Link to="/">Scinuggets</Link> is easy —
            apparently even a page that doesn’t exist... yet. <br />
            Why don't you explore some of the amazing treasures that do exist.{" "}
            <br /> <br />
            <Link to="/">Home</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
