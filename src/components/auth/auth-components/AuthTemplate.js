import React, { useState } from "react";
import { AuthStatus } from "../../../context/AuthStatusContext";
import { authFunction } from "./AuthProviders";
import { authOptions } from "./AuthOptions";
import MailAuth from "./MailAuth";

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

      <div>
        <p>
          {props.question}{" "}
          <span
            onClick={() => {
              setAuthStatus(props.status === "Login" ? "Signup" : "Login");
            }}
          >
            {props.redirect}
          </span>
        </p>
      </div>

      <div>
        <p>
          Click "{props.status}" to agree to Medium’s Terms of Service and
          acknowledge that Medium’s Privacy Policy applies to you.
        </p>
      </div>
      {mailAuth && (
        <div className="auth-template__mail-auth">
          <MailAuth authStatus={props.status} />
        </div>
      )}
    </div>
  );
};

export default AuthTemplate;
