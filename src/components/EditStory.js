import React, { useEffect, useRef, useState } from "react";
import Editorjs from "react-editor-js";

import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";
import Header from "./edit-story-components/Header_";
import Publish from "./edit-story-components/Publish";

import { User } from "../context/UserContext";
import { EDITOR_JS_TOOLS } from "../editor/editorConfig";
import { getDraft } from "./edit-story-components/FunctionProvider";

import "../style/new-story.css";

const NewStory = (props) => {
  const user = User();
  const instanceRef = useRef(null);

  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [draftId, setDraftId] = useState(props.match.params.id);

  const [saving, setSaving] = useState(false);
  const [newPost, setNewPost] = useState(true);

  const [dropDown, setDropDown] = useState(false);
  const [menuDropDown, setMenuDropDown] = useState(false);
  const [editorData, setEditorData] = useState(null);

  const [file, setFile] = useState(null);

  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userDraft, setUserDraft] = useState(null);

  const pageProps = {
    user,
    setSaving,
    newPost,
    setNewPost,
    draftId,
    setDraftId,
    tags,
    setTags,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    setPostImage,
    setUserDraft,
    setEditorData,
    setLoading,
    instanceRef,
  };

  useEffect(() => {
    getDraft(pageProps);
  }, []);

  if (loading) {
    return <ScreenLoader />;
  }
  if (!newPost && userDraft === false) {
    return (
      <PageNotFound
        warning="We can't seem to find that article among your treasures"
        response="Oops"
      />
    );
  }
  return (
    <div
      className="new-story"
      onClick={(e) => {
        !e.target.classList.contains("header__menu--dropdown") &&
          dropDown &&
          setDropDown(false);
      }}
    >
      {publish && (
        <Publish
          user={user}
          setPublish={setPublish}
          pageProps={pageProps}
          file={file}
          postImage={postImage}
          setFile={setFile}
          setPostImage={setPostImage}
          draftId={draftId}
        />
      )}

      <Header
        dropDown={dropDown}
        setDropDown={setDropDown}
        menuDropDown={menuDropDown}
        setMenuDropDown={setMenuDropDown}
        saving={saving}
        user={user}
      />

      {!publish && (
        <div className="new-story__editor">
          <div className="new-story__editor--save-btn-container">
            {title && (
              <button
                className="new-story__editor--save-btn"
                onClick={() => {
                  setPublish(true);
                }}
              >
                Publish
              </button>
            )}
          </div>

          <div className="new-story__editor--header">
            <input type="text" placeholder="Title" value={title} />
          </div>

          {postImage && (
            <div className="new-story__editor--featured-image">
              <img src={postImage} alt="Featured" />
            </div>
          )}

          <div
            className="new-story__editor--body"
            style={{ zIndex: dropDown ? -1 : 1 }}
          >
            {editorData !== null && (
              <Editorjs
                data={editorData}
                instanceRef={(instance) => (instanceRef.current = instance)}
                placeholder="Write your article"
                tools={EDITOR_JS_TOOLS}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewStory;
