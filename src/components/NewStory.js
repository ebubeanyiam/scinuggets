import React, { useRef } from "react";
import Editorjs from "react-editor-js";
import slugify from "slugify";
import { AiOutlineClose } from "react-icons/ai";

import { db, timestamp } from "../firebase/config";

import { User } from "../context/UserContext";
import { AuthModal as AM } from "../context/AuthModalContext";
import Header from "./new-story-components/Header";
import { EDITOR_JS_TOOLS } from "../editor/editorConfig";
import AuthModal from "./auth/AuthModal";

import "../style/new-story.css";
import { useState } from "react";
import { useEffect } from "react";

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

  const [publish, setPublish] = useState(false);

  const saveDraft = async () => {
    setSaving(true);
    const savedData = await instanceRef.current.save();
    if (newPost) {
      db.collection("drafts")
        .add({
          title,
          savedData,
        })
        .then((res) => {
          setSaving(false);
          setNewPost(false);
          setDraftId(res.id);
          window.history.pushState({}, "", `/p/${res.id}`);
        });
    } else {
      db.collection("drafts")
        .doc(draftId)
        .set({
          title,
          savedData,
        })
        .then(() => {
          setSaving(false);
        });
    }
  };

  const handleSave = async () => {
    const slug = slugify(title, {
      lower: true,
    });
    window.history.pushState({}, `${title}`, `/${slug}`);
    const savedData = await instanceRef.current.save();
    db.collection("posts").add({
      title,
      slug,
      savedData,
      timestamp,
      postedBy: user.uid,
    });
  };

  useEffect(() => {
    if (onChangeCount > 0 && onChangeCount % 5 === 0 && title !== "") {
      saveDraft();
    }
  }, [onChangeCount]);

  useEffect(() => {
    if (draftId) {
      setNewPost(false);
      db.collection("drafts")
        .doc(draftId)
        .get()
        .then((doc) => {
          if (doc) {
            setTitle(doc.data().title);
            setEditorData(doc.data().savedData);
          }
        });
    } else {
      setEditorData("");
    }
  }, []);

  if (!user) {
    return <AuthModal setAuth={setAuthModal} />;
  }
  return (
    <div className="new-story">
      {publish && <Publish setPublish={setPublish} />}
      <Header saving={saving} />
      <div className="new-story__editor">
        <div className="new-story__editor--save-btn-container">
          <button
            className="new-story__editor--save-btn"
            onClick={() => {
              setPublish(true);
            }}
          >
            Publish
          </button>
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

const Publish = ({ setPublish }) => {
  return (
    <div className="new-story__publish">
      <div className="new-story__publish--settings">
        <AiOutlineClose
          onClick={() => {
            setPublish(false);
          }}
        />
        <div className="new-story__story--preview">
          <h3>Article Preview</h3>

          <div
            className="new-story__image--preview"
            data-placeholder="Edit me"
          ></div>
        </div>

        <div>
          <input type="text" />
          <input type="text" />
          <p>
            <b>Note</b>: Changes here will affect how your story appears in
            public places like Scinuggets’s homepage — not the story itself.
          </p>
        </div>

        <div>
          <h5>
            Publishing to <b></b>
          </h5>
          <p>
            Add or change tags (up to 5) so readers know what your story is
            about
          </p>
        </div>

        <div>
          <button>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default NewStory;
