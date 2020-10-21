import React, { useState } from "react";
import { AuthStatus } from "../../../context/AuthStatusContext";
import { authFunction } from "./AuthProviders";
import { authOptions } from "./AuthOptions";
import MailAuth from "./MailAuth";
import { Link } from "react-router-dom";

const AuthTemplate = (props) => {
  const [, setAuthStatus] = AuthStatus();
  const [mailAuth, setMailAuth] = useState(false);

  return (
    <div className="auth-template">
      <div className="auth-template__header">
        <h3>{props.headerText}</h3>
      </div>

      <div className="auth-template__auth-options-container">
        {authOptions.map((option, index) => {
          return (
            <div
              key={index}
              className="auth-template__auth-option"
              onClick={() => {
                if (!option.authProvider) {
                  setMailAuth(true);
                } else {
                  authFunction(option.authProvider, props.status);
                }
              }}
            >
              <div
                className="auth-template__auth-option--icon"
                style={{ color: option.color ? option.color : "" }}
              >
                {<option.icon />}
              </div>
              <div className="auth-template__auth-option--text">
                {props.status} {option.text}
              </div>
            </div>
          );
        })}
      </div>

      <div className="auth-modal__auth-redirect">
        <p className="auth-modal__auth-redirect--text">
          {props.question}{" "}
          <span
            className="auth-modal__auth-redirect--text__link"
            onClick={() => {
              setAuthStatus(props.status === "Login" ? "Signup" : "Login");
            }}
          >
            {props.redirect}
          </span>
        </p>
      </div>

      <div className="auth-modal__accept-terms">
        <p className="auth-modal__accept-terms--text">
          Click "{props.status}" to agree to Scinugget's{" "}
          <Link>Terms of Service</Link> and acknowledge that Scinugget's{" "}
          <Link>Privacy Policy</Link> applies to you.
        </p>
      </div>

      {mailAuth && (
        <div className="auth-template__mail-auth">
          <MailAuth authStatus={props.status} setMailAuth={setMailAuth} />
        </div>
      )}
    </div>
  );
};

export default AuthTemplate;
