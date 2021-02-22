import React, { useRef, useState, useEffect } from "react";

import { User } from "../../context/UserContext";
import { db } from "../../firebase/config";

const ProfileSettingsBio = () => {
  const user = User();
  const [editable, setEditable] = useState(false);
  const [bio, setBio] = useState("");
  const [userBio, setUserBio] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setUserBio(doc.data().bio);
        setBio(doc.data().bio);
      });
  }, [user]);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Bio</h3>
        <textarea
          ref={inputEl}
          type="text"
          value={userBio}
          onChange={(e) => {
            setUserBio(e.target.value);
          }}
          style={{ pointerEvents: !editable && "none" }}
        ></textarea>
        <span>
          Your bio appears on your Profile page and with your stories accross
          Scinuggets. Max 160 characters.
        </span>
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
              className="profile__settings--profile__comp-edit__save-btn"
              onClick={() => {
                db.collection("users")
                  .doc(user.uid)
                  .update({
                    bio: userBio,
                  })
                  .then(() => {
                    setEditable(false);
                  });
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditable(false);
                setUserBio(bio);
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

export default ProfileSettingsBio;
