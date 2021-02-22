import React, { useState, useRef, useEffect } from "react";

import { User } from "../../context/UserContext";
import { db } from "../../firebase/config";

const ProfileSettingsUrl = () => {
  const user = User();
  const [editable, setEditable] = useState(false);
  const [url, setUrl] = useState("");
  const [userUrl, setUserUrl] = useState("");
  const inputEl = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        setUserUrl(doc.data().url);
        setUrl(doc.data().url);
      });
  }, [user]);

  return (
    <div className="profile__settings--profile__component">
      <div className="profile__settings--profile__comp-fields">
        <h3>Url</h3>
        <input
          ref={inputEl}
          type="text"
          style={{ pointerEvents: !editable && "none" }}
          value={userUrl}
          onChange={(e) => {
            setUserUrl(e.target.value);
          }}
        />
        <span style={{ color: "red" }}>{errorMessage}</span>
        <span>
          Your profile will be available at{" "}
          <b>scinnugets.com/profile/{userUrl}</b>.
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
                db.collection("usernames")
                  .doc(userUrl)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      setErrorMessage("Username is taken");
                      return;
                    } else {
                      db.collection("usernames").doc(userUrl).set({
                        userEmail: user.email,
                        userId: user.uid,
                      });
                      db.collection("users")
                        .doc(user.uid)
                        .update({
                          username: userUrl,
                        })
                        .then(() => {
                          setEditable(false);
                        });
                    }
                  });
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditable(false);
                setUserUrl(url);
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
