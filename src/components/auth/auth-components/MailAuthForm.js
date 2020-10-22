import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

import { auth } from "../../../firebase/config";
import { AuthModal } from "../../../context/AuthModalContext";

const MailAuthForm = ({ status, setEnterPassword, setFormSubHeading }) => {
  const [, setAuthModal] = AuthModal();
  const [loginStep, setLoginStep] = useState(0);
  const [emailLoginValue, setEmailLoginValue] = useState("");
  const [passwordLoginValue, setPasswordLoginValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    mailAuthFunction(emailLoginValue, passwordLoginValue, status);
  };

  const mailAuthFunction = (email, password, status) => {
    if (status === "Login") {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => res && setAuthModal(false));
    } else {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => res && setAuthModal(false));
    }
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
                  if (emailLoginValue.match(validEmail)) {
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
              />

              <button
                style={{ cursor: setErrorMessage ? "disabled" : "initial" }}
                type="submit"
              >
                {status === "Login" ? "Log In" : "Sign up"}
              </button>
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
