import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AuthStatus } from "../../context/AuthStatusContext";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import "../../style/auth-modal.css";

const AuthModal = ({ setAuth }) => {
  const [authStatus] = AuthStatus();

  return (
    <div
      className="auth-modal"
      onClick={(e) => {
        e.target.classList.contains("auth-modal") && setAuth(false);
      }}
    >
      <div className="auth-modal__modal">
        <AiOutlineClose
          className="auth-modal__modal__close-btn"
          onClick={() => {
            setAuth(false);
          }}
        />
        {authStatus === "Login" ? (
          <LoginModal />
        ) : authStatus === "Signup" ? (
          <SignupModal />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AuthModal;
