import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import readingTime from "reading-time";
import { Link } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";

import { db } from "../firebase/config";

import { getPostById } from "./new-story-components/FunctionProvider";

import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

import "../style/blog.css";

const Blog = (props) => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlData, setHtmlData] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    getPostById(props.match.params.id, setPostData, setLoading);
  }, [props.match.params.id]);

  useEffect(() => {
    if (postData) {
      getHTMLData(postData);
    }

    const photoUrl = async (uid) => {
      await db
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          if (doc.data()) {
            setPhotoUrl(doc.data().photoUrl);
          }
        });
    };
    if (postData) {
      photoUrl(postData.postedBy);
    }
  }, [postData]);

  const getHTMLData = (postData) => {
    let html = "";
    postData.savedData.blocks.forEach((block) => {
      switch (block.type) {
        case "header":
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
        case "paragraph":
          html += `<p>${block.data.text}</p>`;
          break;
        case "delimiter":
          html += "<hr />";
          break;
        case "image":
          html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
          break;
        case "list":
          html += "<ul>";
          block.data.items.forEach(function (li) {
            html += `<li>${li}</li>`;
          });
          html += "</ul>";
          break;
        case "code":
          html += `<code>${block.data.code}</code>`;
          break;
        default:
          console.log("Unknown block type", block.type);
          console.log(block);
          break;
      }
    });
    setHtmlData(html);
  };

  if (loading) {
    return <ScreenLoader />;
  } else if (postData === false) {
    return <PageNotFound />;
  } else {
    return (
      <>
        <div className={`${props.darkMode && "bg-mode--dark"} blog`}>
          <div className="blog__header">
            <div className="profile">
              <Link to="/">
                <h1>Scinuggets</h1>
              </Link>
            </div>
            <div className="header__actions">
              <span>Hello</span>
            </div>
          </div>

          <div className="blog__article">
            <div className="blog__article-header">
              <h1>{postData.title}</h1>
            </div>

            <div className="blog__article-subtitle">
              <h3>{postData.subtitle}</h3>
            </div>

            <div className="blog__article-details">
              <div className="blog__article-details--user">
                <div className="user-image">
                  {photoUrl ? (
                    <img src={photoUrl} alt="author" />
                  ) : (
                    <BiUserCircle />
                  )}
                </div>
                <div className="article-time-details">
                  <span>
                    {
                      <Moment fromNow>
                        {new Date(postData.timestamp.seconds * 1000)}
                      </Moment>
                    }
                  </span>
                  <span>{readingTime(htmlData).text}</span>
                </div>
              </div>
              <div className="blog__article-details--social"></div>
            </div>

            <div className="blog__article-featured-image">
              <img src={postData.featuredImage} alt="featured" />
            </div>

            <div
              className="blog__article-text"
              dangerouslySetInnerHTML={{ __html: htmlData }}
            ></div>
          </div>
        </div>
      </>
    );
  }
};

export default Blog;
