import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiImageAdd } from "react-icons/bi";

import { db } from "../../firebase/config";

import { User } from "../../context/UserContext";
import { ProfileReg } from "../../context/CompleteProfileContext";
import { saveArticle, addFeaturedImage } from "./FunctionProvider";

import Code from "../../assets/svg/code.svg";
import Barbell from "../../assets/svg/barbell.svg";
import Diet from "../../assets/svg/diet.svg";
import Health from "../../assets/svg/health.svg";
import MusicNote from "../../assets/svg/music-note.svg";
import Suitcases from "../../assets/svg/suitcases.svg";
import Sunglasses from "../../assets/svg/sunglasses.svg";
import Technology from "../../assets/svg/technology.svg";

const Publish = (props) => {
  const user = User();
  const [, setOpenProfileReg] = ProfileReg();
  const [title, setTitle] = useState(props.pageProps.title);
  const [subTitle, setSubTitle] = useState("");
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

            <p>Select a category</p>

            <div className="new-story__publish--publish-info__categories">
              <div className="new-story__publish--publish-info__category">
                <img src={Code} alt="category" />
                <span>Programming</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={Barbell} alt="category" />
                <span>Fitness</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={Diet} alt="category" />
                <span>Food</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={Health} alt="category" />
                <span>Lifestyle</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={MusicNote} alt="category" />
                <span>Music</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={Suitcases} alt="category" />
                <span>Travel</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={Sunglasses} alt="category" />
                <span>Fashion</span>
              </div>
              <div className="new-story__publish--publish-info__category">
                <img src={Technology} alt="category" />
                <span>Tech</span>
              </div>
            </div>

            <p>
              Publishing to the right category makes it easier for readers to
              find your post
            </p>

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
