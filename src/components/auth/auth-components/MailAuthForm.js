import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const MailAuthForm = ({ status, setEnterPassword, setFormSubHeading }) => {
  const [loginStep, setLoginStep] = useState(0);
  const [emailLoginValue, setEmailLoginValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form was submitted");
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
                        : "Almost done, Just a few more steps"
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
              {status === "Login" ? (
                <input type="password" />
              ) : (
                <p>
                  We've sent an email to your mailbox, click on it to complete
                  your registration
                </p>
              )}

              {status === "Login" && <button>Sign In</button>}
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

// {status === "Login" && (

// )}
export default MailAuthForm;
