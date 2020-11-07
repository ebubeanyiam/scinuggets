import React from "react";

import { auth } from "../../firebase/config";

const VerifyEmail = ({ actionCode }) => {
  auth
    .applyActionCode(actionCode)
    .then((res) => {
      console.log(res, "Email has been verified");
    })
    .catch((e) => {
      console.log(e.message);
    });
  return <div>Verify your mail</div>;
};

export default VerifyEmail;
