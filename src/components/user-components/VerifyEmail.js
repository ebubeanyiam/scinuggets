import React from "react";
import { useEffect } from "react";

import { auth } from "../../firebase/config";

const VerifyEmail = ({ actionCode }) => {
  useEffect(() => {
    auth
      .applyActionCode(actionCode)
      .then((res) => {
        alert("Email Verified");
      })
      .catch((e) => {
        e && alert("Email Not Verified");
      });
  }, [actionCode]);

  return <div>Verify your mail</div>;
};

export default VerifyEmail;
