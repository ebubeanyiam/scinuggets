import React, { useRef, useState } from "react";

const ProfileSettingsBio = () => {
  const [editable, setEditable] = useState(false);
  const inputEl = useRef(null);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Bio</h3>
        <input
          ref={inputEl}
          type="text"
          style={{ pointerEvents: !editable && "none" }}
        />
        <span>Your bio appears on your Profile page. Max 160 characters.</span>
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

export default ProfileSettingsBio;
