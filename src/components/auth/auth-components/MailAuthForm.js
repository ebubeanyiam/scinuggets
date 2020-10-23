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

  const props = {
    status,
    emailLoginValue,
    passwordLoginValue,
    setLoginStep,
    setErrorMessage,
    setEnterPassword,
    setFormSubHeading,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errorMessage || !passwordLoginValue) {
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
                  _.checkEmail(props);
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
                  _.checkPassword(props);
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
