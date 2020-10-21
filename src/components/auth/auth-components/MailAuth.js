import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { AiOutlineRollback } from "react-icons/ai";

import MailAuthForm from "./MailAuthForm";

const MailAuth = ({ authStatus, setMailAuth }) => {
  if (authStatus === "Login") {
    return (
      <MailAuthTemplate
        status="Login"
        subHeading="Enter the email address associated with your account"
        setMailAuth={setMailAuth}
      />
    );
  } else {
    return (
      <MailAuthTemplate
        status="Sign up"
        subHeading="Enter your email address to create an account"
        setMailAuth={setMailAuth}
      />
    );
  }
};

const MailAuthTemplate = ({ status, subHeading, setMailAuth }) => {
  const [enterPassword, setEnterPassword] = useState(false);
  return (
    <>
      <div className="mail-auth-template__header">
        <h3>{status} with Email</h3>
      </div>

      <div className="mail-auth-template__subheader">
        <p>
          {!enterPassword
            ? subHeading
            : "Enter the password associated with ..."}
        </p>
      </div>

      <MailAuthForm status={status} setEnterPassword={setEnterPassword} />

      <div
        className="mail-auth-template__select-auth-option"
        onClick={() => {
          setMailAuth(false);
        }}
      >
        {enterPassword ? <AiOutlineRollback /> : <BiArrowBack />}{" "}
        <span>All {status} options</span>
      </div>
    </>
  );
};

export default MailAuth;
