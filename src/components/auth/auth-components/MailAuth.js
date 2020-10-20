import React from "react";

const MailAuth = ({ authStatus }) => {
  if (authStatus === "Login") {
    return <div>Login</div>;
  } else {
    return <div>Sign up</div>;
  }
};

export default MailAuth;
