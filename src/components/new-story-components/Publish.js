import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";

import { db } from "../../firebase/config";

import { User } from "../../context/UserContext";
import { ProfileReg } from "../../context/CompleteProfileContext";
import { saveArticle, addFeaturedImage } from "./FunctionProvider";

import TagBox from "./TagBox";

const Publish = (props) => {
  const user = User();
  const [, setOpenProfileReg] = ProfileReg();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState(props.pageProps.title);
  const [subTitle, setSubTitle] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (!doc.data()) {
          setOpenProfileReg(true);
        }
      });
  }, [user, setOpenProfileReg]);

  return (
    <div className="new-story__publish">
      <div className="new-story__publish--settings">
        <AiOutlineClose
          onClick={() => {
            props.setPublish(false);
          }}
          className="new-story__publish--settings__close-btn"
        />
        <div
          style={{ width: publishing ? "95%" : 0 }}
          className="new-story__publish--progress-bar"
        ></div>
        <div className="new-story__story--preview">
          <div>
            <h3>Article Preview</h3>

            <div
              className="new-story__image--preview"
              data-placeholder="Edit me"
            >
              {props.postImage && <img src={props.postImage} alt="Featured" />}
              <form>
                <label>
                  <BiImageAdd className="new-story__image--preview-add-image" />
                  <input
                    type="file"
                    onChange={(e) => {
                      addFeaturedImage(e, props.setFile, props.setPostImage);
                    }}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </label>
              </form>
              Include a high-quality image in your story to make it more
              inviting to readers.
            </div>
          </div>

          <div className="new-story__story--title">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                props.pageProps.setTitle(e.target.value);
              }}
              placeholder="Change your title"
            />
            <textarea
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Add a subtitle"
            ></textarea>
            <p>
              <b>Note</b>: Changes here will affect how your story appears in
              public places like Scinuggets’s homepage — not the story itself.
            </p>
          </div>
        </div>

        <div className="new-story__publish--publish">
          <div className="new-story__publish--publish-info">
            <h5>
              Publishing to <b>{user.displayName}</b>
            </h5>

            <p>
              Publishing to the right category makes it easier for readers to
              find your post
            </p>

            <TagBox tags={tags} setTags={setTags} />

            <p>
              Add or change tags (up to 5) so readers know what your story is
              about
            </p>
          </div>

          <div className="new-story__publish--publish-btn-container">
            <button
              className="new-story__publish--publish-btn"
              onClick={() => {
                saveArticle(
                  props.user,
                  props.pageProps,
                  title,
                  subTitle,
                  tags,
                  props.file,
                  setPublishing
                );
              }}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
