import React, { useRef, useState, useEffect } from "react";

import { User } from "../../context/UserContext";
import { db } from "../../firebase/config";

const ProfileSettingsName = () => {
  const user = User();
  const [editable, setEditable] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    setDisplayName(user.displayName);
  }, [user]);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Name</h3>
        <input
          ref={inputEl}
          type="text"
          value={displayName}
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          style={{ pointerEvents: !editable && "none" }}
        />
        <span>
          Your name appears on your Profile page, as your byline, and in your
          responses. It is a required field.
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
              onClick={async () => {
                await user.updateProfile({
                  displayName: displayName,
                });
                db.collection("users")
                  .doc(user.uid)
                  .update({
                    displayName: displayName,
                  })
                  .then((res) => {
                    setEditable(false);
                  });
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditable(false);
                setDisplayName(user.displayName);
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

export default ProfileSettingsName;
