import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";

import { UserData } from "../../context/UserContext";

import "../../style/profile/authorcard.css";

const AuthorCard = ({ data }) => {
  const userData = UserData();

  return (
    <div className="profile__authorcard">
      <img src={data.photoUrl} alt="user" />
    </div>
  );
};

export default AuthorCard;
