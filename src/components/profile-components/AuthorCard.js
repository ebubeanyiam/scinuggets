import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

import { UserData } from "../../context/UserContext";

import "../../style/profile/authorcard.css";

const AuthorCard = ({ id }) => {
  const userData = UserData();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    db.collection("users")
      .where("username", "===", id)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          console.log(doc.id, "==>", doc.data());
          setProfileData(doc.data());
        });
      });
  }, []);

  return (
    <div className="profile__authorcard">
      <img src={profileData.photoUrl} alt="user" />
    </div>
  );
};

export default AuthorCard;
