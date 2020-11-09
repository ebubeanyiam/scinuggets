import React from "react";
import { useEffect } from "react";

import { auth } from "../../firebase/config";
import { ToastOpen } from "../../context/ToastNotificationContext";

import svg_orderConfirmed from "../../assets/svg/undraw_order_confirmed_aaw7.svg";
import svg_accessDenied from "../../assets/svg/undraw_access_denied_6w73.svg";

const VerifyEmail = ({ actionCode }) => {
  const [
    ,
    setToastOpen,
    toastStatus,
    setToastStatus,
    ,
    setToastMessage,
  ] = ToastOpen();

  useEffect(() => {
    auth
      .applyActionCode(actionCode)
      .then((res) => {
        setToastOpen(true);
        setToastStatus("success");
        setToastMessage("Email Verified");
      })
      .catch((e) => {
        setToastOpen(true);
        setToastStatus("error");
        setToastMessage(e.message);
      });
  }, []);

  return (
    <div>
      <div>
        <img
          src={
            toastStatus === "success" ? svg_orderConfirmed : svg_accessDenied
          }
          alt="svg"
        />
      </div>

      <div>
        <h1>Scinuggets</h1>

        <p>
          {toastStatus === "success"
            ? "Your Email has been verified."
            : "Unfortunately we could not verify your Email at the moment"}
        </p>

        <span onClick={window.location.replace("/")}>Go back home</span>
      </div>
    </div>
  );
};

export default VerifyEmail;
