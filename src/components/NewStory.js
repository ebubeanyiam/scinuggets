import React, { useEffect, useRef, useState } from "react";
import Editorjs from "react-editor-js";

import { User } from "../context/UserContext";
import { AuthModal as AM } from "../context/AuthModalContext";
import Header from "./new-story-components/Header";
import { EDITOR_JS_TOOLS } from "../editor/editorConfig";
import Publish from "./new-story-components/Publish";
import AuthModal from "./auth/AuthModal";
import { getDraft, saveDraft } from "./new-story-components/FunctionProvider";

import "../style/new-story.css";

const NewStory = (props) => {
  const user = User();
  const [, setAuthModal] = AM();
  const instanceRef = useRef(null);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [newPost, setNewPost] = useState(true);
  const [editorData, setEditorData] = useState(null);
  const [draftId, setDraftId] = useState(props.match.params.id);
  const [onChangeCount, setOnChangeCount] = useState(0);

  const [file, setFile] = useState(null);
  const [postImage, setPostImage] = useState(null);

  const [publish, setPublish] = useState(false);

  const pageProps = {
    setSaving,
    newPost,
    setNewPost,
    draftId,
    setDraftId,
    title,
    setTitle,
    setEditorData,
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
  return (
    <div className="new-story">
      {publish && (
        <Publish user={user} setPublish={setPublish} pageProps={pageProps} />
      )}
      <Header saving={saving} setFile={setFile} setPostImage={setPostImage} />

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

        <div className="new-story__editor--body">
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
