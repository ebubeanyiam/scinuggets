import React, { useRef, useState, useEffect } from "react";

import { User } from "../../context/UserContext";
import { db } from "../../firebase/config";

const ProfileSettingsBio = () => {
  const user = User();
  const [editable, setEditable] = useState(false);
  const [website, setWebsite] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const inputEl = useRef(null);

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setUserWebsite(doc.data().website);
        setWebsite(doc.data().website);
      });
  }, [user]);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Website</h3>
        <input
          ref={inputEl}
          type="url"
          style={{ pointerEvents: !editable && "none" }}
          value={userWebsite}
          onChange={(e) => {
            setUserWebsite(e.target.value);
          }}
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
              className="profile__settings--profile__comp-edit__save-btn"
              onClick={() => {
                db.collection("users")
                  .doc(user.uid)
                  .update({
                    website: userWebsite,
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
                setUserWebsite(website);
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
