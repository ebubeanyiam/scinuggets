import React, { useRef, useState } from "react";

const ProfileSettingsBio = () => {
  const [editable, setEditable] = useState(false);
  const inputEl = useRef(null);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Website</h3>
        <input
          ref={inputEl}
          type="text"
          style={{ pointerEvents: !editable && "none" }}
        />
        <span>
          Add a personal blog or portfolio so that others can find out more
          about you.
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

export default ProfileSettingsBio;
