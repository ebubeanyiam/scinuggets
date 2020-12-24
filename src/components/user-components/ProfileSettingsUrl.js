import React, { useState, useRef } from "react";

const ProfileSettingsUrl = () => {
  const [editable, setEditable] = useState(false);
  const inputEl = useRef(null);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Url</h3>
        <input
          ref={inputEl}
          type="text"
          style={{ pointerEvents: !editable && "none" }}
        />
        <span>
          Your profile will be available at <b>scinnugets.com/profile/</b>.
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

export default ProfileSettingsUrl;
