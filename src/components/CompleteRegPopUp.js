import React, { useEffect, useState } from "react";
import { BiImageAdd } from "react-icons/bi";

import { selectImage, updateProfile } from "./Logic";

import { User } from "../context/UserContext";
import { ProfileReg } from "../context/CompleteProfileContext";

import "../style/complete_profile.css";

const CompleteRegPopUp = () => {
  const user = User();
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [postImage, setPostImage] = useState(null);
  const [, setOpenProfileReg] = ProfileReg();

  useEffect(() => {
    if (updated) {
      setOpenProfileReg(false);
    }
  }, [updated, setOpenProfileReg]);

  return (
    <div className="completeregpopup">
      <div className="completeregpopup__modal">
        <h4>Update your profile to continue publishing</h4>

        <form>
          <label>
            Tell us your name
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </label>

          <label>
            <span>Update your profile picture (optional)</span>
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

        {name.length > 3 && (
          <button
            onClick={() => {
              updateProfile(user, name, file, setUpdated);
            }}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default CompleteRegPopUp;
