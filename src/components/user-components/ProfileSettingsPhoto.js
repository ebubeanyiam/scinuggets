import React, { useRef, useState, useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";

import { User } from "../../context/UserContext";
import { db, store } from "../../firebase/config";
import { selectImage } from "../Logic";

import DefaultUserImage from "../../assets/images/default_profile-img.png";

const ProfileSettingsPhoto = () => {
  const user = User();
  const [editable, setEditable] = useState(false);
  const inputEl = useRef(null);
  const [file, setFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    setPhotoUrl(user.photoURL);
  }, [user]);

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
          <img src={photoUrl ? photoUrl : DefaultUserImage} alt="you" />
          <input
            ref={inputEl}
            type="file"
            onChange={(e) => {
              selectImage(e, setFile, setPhotoUrl);
            }}
            style={{ display: "none" }}
          />
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
              className="profile__settings--profile__comp-edit__save-btn"
              onClick={async () => {
                if (file) {
                  await store
                    .ref(file.name)
                    .put(file)
                    .then(async (snapshot) => {
                      await snapshot.ref.getDownloadURL().then((res) => {
                        setPhotoUrl(res);
                        user.updateProfile({
                          photoURL: res,
                        });
                        db.collection("users")
                          .doc(user.uid)
                          .update({
                            photoUrl: photoUrl,
                          })
                          .then(() => {
                            setEditable(false);
                          });
                      });
                    });
                }
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditable(false);
                setPhotoUrl(user.photoURL);
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
