import React from "react";
import { Link } from "react-router-dom";

const AuthTemplate = (props) => {
  return (
    <div className="auth-template">
      <div className="auth-template__header">
        <h3>{props.headerText}</h3>
      </div>

      <div className="auth-template__auth-options-container">
        {props.authOptions.map((option, index) => {
          return (
            <div key={index} className="auth-template__auth-option">
              <div
                className="auth-template__auth-option--icon"
                style={{ color: option.color ? option.color : "" }}
              >
                {<option.icon />}
              </div>
              <div>{option.text}</div>
            </div>
          );
        })}
      </div>

      <div>
        <p>
          {props.question}
          <Link to="">{props.redirect}</Link>
        </p>
      </div>

      <div>
        <p>
          Click {props.text} to agree to Medium’s Terms of Service and
          acknowledge that Medium’s Privacy Policy applies to you.
        </p>
      </div>
    </div>
  );
};

export default AuthTemplate;
