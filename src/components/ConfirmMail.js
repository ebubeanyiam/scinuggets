import React from "react";

import { auth } from "../firebase/config";
import { ToastOpen } from "../context/ToastNotificationContext";

import "../style/user-setup.css";
import svg_Taken from "../assets/svg/undraw_Taken_re_yn20.svg";
import svg_Mail from "../assets/svg/undraw_Mail_sent_re_0ofv.svg";

const ConfirmMail = () => {
  const [, setToastOpen, , setToastStatus, , setToastMessage] = ToastOpen();

  const resendEmail = () => {
    auth.currentUser
      .sendEmailVerification()
      .then(() => {
        setToastOpen(true);
        setToastStatus("success");
        setToastMessage("Email Sent");
      })
      .catch((e) => {
        setToastOpen(true);
        setToastStatus("error");
        setToastMessage(e.message);
      });
  };

  return (
    <div className="user-setup">
      <img className="user-setup__svg svg_taken" src={svg_Taken} alt="svg" />
      <div className="user-setup__modal">
        <h1>Scinuggets</h1>

        <img className="user-setup__svg svg_mail" src={svg_Mail} alt="svg" />

        <h1>Verify your email to continue</h1>

        <p>
          We've sent an email to your email address, Click on the link to verify
          your account
        </p>

        <p>
          Didn't recieve a mail?{" "}
          <span className="user-setup__cta" onClick={resendEmail}>
            Click here
          </span>{" "}
          to receive another
        </p>

        <p>
          Or{" "}
          <span
            className="user-setup__cta"
            onClick={() => {
              auth.signOut().then(() => {
                window.location.replace("/");
              });
            }}
          >
            Sign Out
          </span>{" "}
          to continue using the app anonymously
        </p>
      </div>
    </div>
  );
};

export default ConfirmMail;
