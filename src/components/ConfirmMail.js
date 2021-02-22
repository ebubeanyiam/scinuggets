import React from "react";

import { auth } from "../firebase/config";

import "../style/user-setup.css";

const ConfirmMail = () => {
  const resendEmail = () => {
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        alert("Email sent");
      })
      .catch((e) => {
        alert("Error", e.message);
      });
  };

  return (
    <div className="user-setup">
      <div className="user-setup__modal">
        <p>
          We've sent an email to your email address, Click on the link to verify
          your account or{" "}
          <span className="user-setup__cta" onClick={resendEmail}>
            click here
          </span>{" "}
          to recieve another
        </p>
      </div>
    </div>
  );
};

export default ConfirmMail;
