import React from "react";
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
  return (
    <>
      <div className="mail-auth-template__header">
        <h3>{status} with Email</h3>
      </div>

      <div>
        <p>{subHeading}</p>
      </div>

      <MailAuthForm status={status} />

      <div>
        <span
          onClick={() => {
            setMailAuth(false);
          }}
        >
          All {status} options
        </span>
      </div>
    </>
  );
};

export default MailAuth;
