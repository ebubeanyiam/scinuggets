import React from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import "../../style/auth-modal.css";

const AuthModal = ({ setAuth, status }) => {
  return (
    <div
      className="auth-modal"
      onClick={(e) => {
        e.target.classList.contains("auth-modal") && setAuth(false);
      }}
    >
      {status === "Login" ? (
        <LoginModal />
      ) : status === "Signup" ? (
        <SignupModal />
      ) : (
        ""
      )}
    </div>
  );
};

export default AuthModal;
