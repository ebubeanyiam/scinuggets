import React, { useEffect, useState } from "react";

import { User } from "../context/UserContext";

import Header from "./Header";
import { FcCheckmark } from "react-icons/fc";

import { auth, db } from "../firebase/config";
import "../style/user_mgmt.css";

const UserManagement = (props) => {
  const user = User();
  const [userData, setUserData] = useState({});
  const [actionText, setActionText] = useState("Complete your profile");
  const [dropDown, setDropDown] = useState(false);

  const mode = new URLSearchParams(props.location.search).get("mode");
  const actionCode = new URLSearchParams(props.location.search).get("oobCode");

  const success = "Email Verified";

  useEffect(() => {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc) {
          setUserData(doc.data());
        }
      });
  }, [user.uid]);

  const verifyEmail = async (actionCode) => {
    await auth
      .applyActionCode(actionCode)
      .then((res) => {
        setActionText(success);
      })
      .catch((e) => {
        setActionText(e.message);
      });
  };

  switch (mode) {
    case "verifyEmail":
      verifyEmail(actionCode);
      break;
    // return <VerifyEmail actionCode={actionCode} />;
    default:
      console.log("mode is empty");
  }

  return (
    <div
      className="user_management"
      onClick={(e) => {
        !e.target.classList.contains("header__menu--dropdown") &&
          dropDown &&
          setDropDown(false);
      }}
    >
      <Header dropDown={dropDown} setDropDown={setDropDown} />
      <div className="user_mgmt--current_action">
        <span style={{ color: actionText === success && "green" }}>
          {actionText}
        </span>
      </div>
      <div className="user_mgmt--actions">
        <div className="user_mgmt--action">
          <span>Set a display name</span>
          <div className="user_mgmt--action_status">
            {userData.displayName && <FcCheckmark />}
          </div>
        </div>
        <div className="user_mgmt--action">
          <span>Set a profile image</span>
          <div className="user_mgmt--action_status">
            {userData.photoUrl && <FcCheckmark />}
          </div>
        </div>
        <div className="user_mgmt--action">
          <span>Add a bio</span>
          <div className="user_mgmt--action_status">
            {userData.bio && <FcCheckmark />}
          </div>
        </div>
        <div className="user_mgmt--action">
          <span>Create a username</span>
          <div className="user_mgmt--action_status">
            {userData.username && <FcCheckmark />}
          </div>
        </div>
        <div className="user_mgmt--action">
          <span>Verify your email</span>
          <div className="user_mgmt--action_status">
            {user.emailVerified && <FcCheckmark />}
          </div>
        </div>
        <div className="user_mgmt--action">
          <span>Post a story</span>
          <div className="user_mgmt--action_status">
            {userData.posts && <FcCheckmark />}
          </div>
        </div>
        {/* <div className="user_mgmt--action"></div> */}
      </div>
    </div>
  );
};

export default UserManagement;
