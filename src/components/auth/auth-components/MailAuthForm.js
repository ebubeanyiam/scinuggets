import React from "react";

const MailAuthForm = ({ status }) => {
  if (status === "Login") {
    return <div>hello Login</div>;
  } else {
    return <div>hello signup</div>;
  }
};

export default MailAuthForm;
