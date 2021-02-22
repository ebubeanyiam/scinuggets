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
        alert(Error, e.message);
      });
  }, []);

  return (
    <div>
      <div></div>

      <div>
        <h1>Scinuggets</h1>

        <span onClick={() => window.location.replace("/")}>Go back home</span>
      </div>
    </div>
  );
};

export default VerifyEmail;
