import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { saveArticle } from "./FunctionProvider";

const Publish = ({ user, setPublish, pageProps }) => {
  const [title, setTitle] = useState(pageProps.title);
  const [subTitle, setSubTitle] = useState("");

  return (
    <div className="new-story__publish">
      <div className="new-story__publish--settings">
        <AiOutlineClose
          onClick={() => {
            setPublish(false);
          }}
          className="new-story__publish--settings__close-btn"
        />
        <div className="new-story__story--preview">
          <div>
            <h3>Article Preview</h3>

            <div
              className="new-story__image--preview"
              data-placeholder="Edit me"
            >
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
                pageProps.setTitle(e.target.value);
              }}
              placeholder="Change your title"
            />
            <input
              type="text"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Add a subtitle"
            />
            <p>
              <b>Note</b>: Changes here will affect how your story appears in
              public places like Scinuggets’s homepage — not the story itself.
            </p>
          </div>
        </div>

        <div className="new-story__publish--publish">
          <div className="new-story__publish--publish-info">
            <h5>
              Publishing to <b></b>
            </h5>
            <p>
              Add or change tags (up to 5) so readers know what your story is
              about
            </p>
          </div>

          <div className="new-story__publish--publish-btn-container">
            <button
              className="new-story__publish--publish-btn"
              onClick={() => {
                saveArticle(user, pageProps, title, subTitle);
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
