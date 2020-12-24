import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import readingTime from "reading-time";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBookmark } from "react-icons/bs";
import { VscComment } from "react-icons/vsc";

import { db } from "../firebase/config";

import { getPostById } from "./new-story-components/FunctionProvider";

import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

import DefaultProfile from "../assets/images/default_profile-img.png";

import "../style/blog.css";
import Header from "./Header";

const Blog = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [htmlData, setHtmlData] = useState("");
  const [author, setAuthor] = useState("");
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
            setAuthor(doc.data().displayName);
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
              <div className="header__actions">
                <span>Hello</span>
              </div>
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
                    {photoUrl ? (
                      <img src={photoUrl} alt="author" />
                    ) : (
                      <img src={DefaultProfile} alt="author" />
                    )}
                  </div>
                  <div className="article-time-details">
                    <div className="article-time-details--author">
                      <span>{author}</span>
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
                <div className="blog__author-card">
                  <div className="blog__author-card--header"></div>
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
