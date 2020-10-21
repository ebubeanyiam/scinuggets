import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { AuthStatus } from "../../context/AuthStatusContext";
import { useRouteMatch } from "react-router-dom";

import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

import "../../style/auth-modal.css";

const AuthModal = ({ setAuth }) => {
  const [authStatus] = AuthStatus();
  const match = useRouteMatch("/s/signin");

  return (
    <div
      className="auth-modal"
      style={{ background: match ? "#fff" : "" }}
      onClick={(e) => {
        !match && e.target.classList.contains("auth-modal") && setAuth(false);
      }}
    >
      <div className="auth-modal__modal">
        {!match && (
          <AiOutlineClose
            className="auth-modal__modal__close-btn"
            onClick={() => {
              setAuth(false);
            }}
          />
        )}
        {authStatus === "Signup" ? <SignupModal /> : <LoginModal />}
      </div>
    </div>
  );
};

export default AuthModal;
