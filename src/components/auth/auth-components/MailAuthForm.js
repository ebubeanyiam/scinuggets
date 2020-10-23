import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import * as _ from "./AuthProviders";
import { AuthModal } from "../../../context/AuthModalContext";

const MailAuthForm = ({ status, setEnterPassword, setFormSubHeading }) => {
  const [loginStep, setLoginStep] = useState(0);
  const [emailLoginValue, setEmailLoginValue] = useState("");
  const [passwordLoginValue, setPasswordLoginValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [, setAuthModal] = AuthModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage) {
      return;
    }
    _.mailAuthFunction(
      emailLoginValue,
      passwordLoginValue,
      setAuthModal,
      status
    );
  };

  return (
    <form className="mail-auth-form" onSubmit={handleSubmit}>
      <div className="mail-auth-form__form-input-container">
        <div className="mail-auth-form__input-container">
          {loginStep === 0 && (
            <>
              <input
                type="email"
                value={emailLoginValue}
                onChange={(e) => {
                  setEmailLoginValue(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  if (emailLoginValue.match(_.validEmail)) {
                    setLoginStep(1);
                    setErrorMessage("");
                    setEnterPassword(true);
                    setFormSubHeading(
                      status === "Login"
                        ? "Enter the password associated with ...."
                        : "Create a new password for ..."
                    );
                  } else {
                    setErrorMessage(
                      emailLoginValue.length < 1
                        ? "You haven't typed in an Email"
                        : "Invalid Email"
                    );
                  }
                }}
              >
                Check
              </button>
            </>
          )}

          {loginStep === 1 && (
            <>
              <input
                type="password"
                value={passwordLoginValue}
                onChange={(e) => {
                  setPasswordLoginValue(e.target.value);
                }}
                onKeyUp={() => {
                  if (status === "Sign up") {
                    if (!passwordLoginValue.match(_.validPassword)) {
                      setErrorMessage(
                        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter and a number "
                      );
                    } else {
                      setErrorMessage("");
                    }
                  }
                }}
              />

              {passwordLoginValue.match(_.validPassword) && (
                <button type="submit">
                  {status === "Login" ? "Log In" : "Sign up"}
                </button>
              )}

              <div className="mail-auth-form__input-container--change-email">
                <BiArrowBack />
                <p
                  onClick={() => {
                    setLoginStep(0);
                    setEnterPassword(false);
                  }}
                >
                  Change Email
                </p>
              </div>
            </>
          )}
        </div>

        <p className="mail-auth-form__error-message">{errorMessage}</p>
      </div>
    </form>
  );
};

export default MailAuthForm;
