import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { UserData } from "../../context/UserContext";

import "../../style/profile/authorcard.css";

const AuthorCard = ({ data }) => {
  const userData = UserData();

  return (
    <div className="profile__authorcard">
      <div className="profile__authorcard-image">
        <img src={data.photoUrl} alt="user" />
      </div>

      <div className="profile__authorcard-details">
        <div className="profile_authorcard-details__username">
          <span>{data.username}</span>
          {userData.username === data.username ? (
            <Link to="/me/settings">
              <button>Edit</button>
            </Link>
          ) : (
            <button>Follow</button>
          )}
        </div>

        <div className="profile_authorcard-details__name">
          <h3>{data.displayName}</h3>
        </div>

        <div className="profile_authorcard-details__bio">
          <p>{data.bio}</p>
        </div>

        {data.website && (
          <div className="profile_authorcard-details__bio">
            <p>{data.website}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
