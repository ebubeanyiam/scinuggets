import React, { useState } from "react";

import Header from "../Header";

import "../../style/profile_settings.css";
import ProfileSettingsName from "./ProfileSettingsName";
import ProfileSettingsBio from "./ProfileSettingsBio";
import ProfileSettingsUrl from "./ProfileSettingsUrl";
import ProfileSettingsPhoto from "./ProfileSettingsPhoto";

const ProfileSettings = () => {
  const [dropDown, setDropDown] = useState(false);

  return (
    <div
      className="profile__settings"
      onClick={(e) => {
        !e.target.classList.contains("header__menu--dropdown") &&
          dropDown &&
          setDropDown(false);
      }}
    >
      <Header dropDown={dropDown} setDropDown={setDropDown} />
      <div className="profile__settings-nav">
        <h3>Settings</h3>

        <ul>
          <li>
            <a href="#profile">Profile</a>
          </li>
          <li>
            <a href="#email_settings">Email Settings</a>
          </li>
          <li>
            <a href="#account">Account</a>
          </li>
          <li>
            <a href="#membership">Membership</a>
          </li>
          <li>
            <a href="#security">Security</a>
          </li>
        </ul>
      </div>

      <div className="profile__settings-action">
        <div className="profile__settings--profile">
          <h3 className="profile__settings--header">Profile</h3>

          <ProfileSettingsName />
          <ProfileSettingsBio />
          <ProfileSettingsPhoto />
          <ProfileSettingsUrl />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
