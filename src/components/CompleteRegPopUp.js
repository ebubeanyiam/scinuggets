import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";

import { selectImage, updateProfile } from "./Logic";

import { User } from "../context/UserContext";
import { ProfileReg } from "../context/CompleteProfileContext";

import "../style/complete_profile.css";

const CompleteRegPopUp = () => {
  const user = User();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [file, setFile] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [, setOpenProfileReg] = ProfileReg();

  useEffect(() => {
    if (updated) {
      setOpenProfileReg(false);
    }
  }, [updated, setOpenProfileReg]);

  return (
    <div className="completeregpopup">
      <div className="completeregpopup__modal">
        <h4>Finish Creating your account</h4>

        {errorMessage && (
          <span className="completeregpopup__modal-errorMessage">
            {errorMessage}
          </span>
        )}

        <form>
          <label>
            <b>Tell us your name</b>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>

          <label>
            <b>Create a username</b>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>

          <label>
            <span>
              <b>Update your profile picture (optional)</b>
            </span>
            <BiImageAdd className="new-story__image--preview-add-image" />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                selectImage(e, setFile, setPostImage);
              }}
            />
            {postImage && <img src={postImage} alt="user" />}
          </label>
        </form>

        <button
          onClick={() => {
            if (name.length < 3 || username.length < 3) {
              setErrorMessage(
                "Name or Username can not be less than 3 characters"
              );
              return;
            }
            updateProfile(user, name, username, file, setErrorMessage, setUpdated);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default CompleteRegPopUp;
