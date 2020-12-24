import React, { useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";

import DefaultUserImage from "../../assets/images/default_profile-img.png";

const ProfileSettingsPhoto = () => {
  const [editable, setEditable] = useState(false);
  const inputEl = useRef(null);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Photo</h3>
        <span>
          Your photo appears on your Profile page and with your stories across
          Scinuggets.
        </span>
        <span>
          Recommended size: Square, at least 1000 pixels per side. File type:
          JPG, PNG or GIF.
        </span>
        <label style={{ pointerEvents: !editable && "none" }}>
          {editable && <AiOutlineCamera />}
          <img src={DefaultUserImage} alt="you" />
          <input ref={inputEl} type="file" style={{ display: "none" }} />
        </label>
      </div>

      <div className="profile__settings--profile__comp-edit">
        {!editable && (
          <button
            onClick={() => {
              setEditable(true);
              inputEl.current.focus();
            }}
          >
            Edit
          </button>
        )}

        {editable && (
          <>
            <button
              onClick={() => {
                // setEditable(true);
                // inputEl.current.focus();
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditable(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSettingsPhoto;
