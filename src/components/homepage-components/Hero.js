import React from "react";

import { AuthStatus } from "../../context/AuthStatusContext";
import { AuthModal } from "../../context/AuthModalContext";

import "../../style/homepage/hero.css";

const Hero = () => {
  const [, setAuthStatus] = AuthStatus();
  const [, setAuthModal] = AuthModal();
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Great articles, by great Writers</h1>

        <p>
          Read and share new perspectives on just about any topic. Everyone’s
          welcome. Learn more.
        </p>

        <button
          onClick={() => {
            setAuthModal(true);
            setAuthStatus("Signup");
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
