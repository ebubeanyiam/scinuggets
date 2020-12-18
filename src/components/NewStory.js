import React, { useEffect, useRef, useState } from "react";
import Editorjs from "react-editor-js";

import { User } from "../context/UserContext";
import { AuthModal as AM } from "../context/AuthModalContext";
import Header from "./new-story-components/Header_";
import { EDITOR_JS_TOOLS } from "../editor/editorConfig";
import Publish from "./new-story-components/Publish";
import AuthModal from "./auth/AuthModal";
import { getDraft, saveDraft } from "./new-story-components/FunctionProvider";

import "../style/new-story.css";
import PageNotFound from "./PageNotFound";
import ScreenLoader from "./ScreenLoader";

const NewStory = (props) => {
  const user = User();
  const [, setAuthModal] = AM();
  const instanceRef = useRef(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [newPost, setNewPost] = useState(true);
  const [dropDown, setDropDown] = useState(false);
  const [editorData, setEditorData] = useState(null);
  const [draftId, setDraftId] = useState(props.match.params.id);
  const [onChangeCount, setOnChangeCount] = useState(0);

  const [file, setFile] = useState(null);
  const [postImage, setPostImage] = useState(null);

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
    title,
    setTitle,
    setUserDraft,
    setEditorData,
    setLoading,
    instanceRef,
  };

  useEffect(() => {
    if (onChangeCount > 0 && onChangeCount % 5 === 0 && title !== "") {
      saveDraft(pageProps, title);
    }
  }, [onChangeCount]);

  useEffect(() => {
    getDraft(pageProps);
  }, []);

  if (!user) {
    return <AuthModal setAuth={setAuthModal} />;
  }
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
        />
      )}
      <Header dropDown={dropDown} setDropDown={setDropDown} saving={saving} />

      <div className="new-story__editor">
        <div className="new-story__editor--save-btn-container">
          {title && (
            <button
              className="new-story__editor--save-btn"
              onClick={() => {
                setPublish(true);
                saveDraft(pageProps, title);
              }}
            >
              Publish
            </button>
          )}
        </div>

        <div className="new-story__editor--header">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
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
              onChange={() => {
                setOnChangeCount(onChangeCount + 1);
              }}
              data={editorData}
              instanceRef={(instance) => (instanceRef.current = instance)}
              placeholder="Write your article"
              tools={EDITOR_JS_TOOLS}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewStory;
