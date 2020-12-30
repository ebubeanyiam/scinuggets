import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import readingTime from "reading-time";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { VscComment } from "react-icons/vsc";

import { db } from "../firebase/config";
import { getAuthorDetails } from "./Logic";

import { getPostById } from "./new-story-components/FunctionProvider";

import { User } from "../context/UserContext";

import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

import DefaultProfile from "../assets/images/default_profile-img.png";

import "../style/blog.css";
import Header from "./Header";

const Blog = (props) => {
  const user = User();
  const [dropDown, setDropDown] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlData, setHtmlData] = useState("");

  const [authorDetails, setAuthorDetails] = useState({});

  useEffect(() => {
    getPostById(props.match.params.id, setPostData, setLoading);
  }, [props.match.params.id]);

  useEffect(() => {
    if (postData) {
      getHTMLData(postData);
      getAuthorDetails(postData.postedBy, setAuthorDetails);
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
        <div
          className={`${props.darkMode && "bg-mode--dark"} blog`}
          onClick={(e) => {
            !e.target.classList.contains("header__menu--dropdown") &&
              dropDown &&
              setDropDown(false);
          }}
        >
          <Header dropDown={dropDown} setDropDown={setDropDown} />
          <div className="blog__header-container">
            <div className="blog__header">
              <div className="profile">
                <Link to="/">
                  <h1>Category</h1>
                </Link>
              </div>
              {user && postData.postedBy === user.uid && (
                <div className="header__actions">
                  <button>Edit</button>
                </div>
              )}
            </div>
          </div>

          <div className="blog__article-container">
            <aside className="blog__story-component">
              <div className="blog__story-comp-card-container">
                <div className="blog__story-comp-card">
                  <IoMdHeartEmpty />
                  <span>0</span>
                </div>

                <div className="blog__story-comp-card">
                  <VscComment />
                  <span>0</span>
                </div>

                <div className="blog__story-comp-card">
                  <BsBookmark />
                  <span>100</span>
                </div>
              </div>
            </aside>

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
                    {authorDetails.photoUrl ? (
                      <img src={authorDetails.photoUrl} alt="author" />
                    ) : (
                      <img src={DefaultProfile} alt="author" />
                    )}
                  </div>
                  <div className="article-time-details">
                    <div className="article-time-details--author">
                      <span>
                        {authorDetails.displayName && authorDetails.displayName}
                      </span>
                    </div>
                    <div className="article-time-details--time">
                      <span>
                        {
                          <Moment fromNow>
                            {new Date(postData.timestamp.seconds * 1000)}
                          </Moment>
                        }{" "}
                        .
                      </span>
                      <span>{readingTime(htmlData).text}</span>
                    </div>
                  </div>
                </div>

                <div className="blog__article-details--social"></div>
              </div>

              <div className="blog__article-featured-image">
                {postData.featuredImage && (
                  <img src={postData.featuredImage} alt="featured" />
                )}
              </div>

              <div
                className="blog__article-text"
                dangerouslySetInnerHTML={{ __html: htmlData }}
              ></div>
            </div>

            <aside className="blog__author-component">
              <div className="blog__author-card-container">
                <div className="blog__author-card author__details">
                  <div className="blog__author-card--header">
                    {authorDetails.photoUrl ? (
                      <img src={authorDetails.photoUrl} alt="author" />
                    ) : (
                      <img src={DefaultProfile} alt="author" />
                    )}
                    <h3>
                      {authorDetails.displayName && authorDetails.displayName}
                    </h3>
                  </div>

                  <div className="blog__author-card--bio">
                    <span>{authorDetails.bio && authorDetails.bio}</span>
                  </div>

                  <div className="blog__author-card--follow">
                    <button>Follow</button>
                  </div>

                  <div className="blog__author-card--website">
                    <h4 className="blog__author-card--desc">WEBSITE</h4>
                    <span>
                      {authorDetails.website && (
                        <a
                          href={authorDetails.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {authorDetails.website}
                        </a>
                      )}
                    </span>
                  </div>

                  <div className="blog__author-card--date-joined">
                    <h4 className="blog__author-card--desc">JOINED</h4>
                    <span>Some Date</span>
                  </div>
                </div>
                <div className="blog__author-card">
                  <div className="blog__author-card--header"></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </>
    );
  }
};

export default Blog;
