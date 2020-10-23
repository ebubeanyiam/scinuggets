import React, { useState, createContext, useContext } from "react";

const AuthModalContext = createContext();

export const AuthModal = () => {
  return useContext(AuthModalContext);
};

export const AuthModalProvider = ({ children }) => {
  const [authModal, setAuthModal] = useState(false);

  return (
    <AuthModalContext.Provider value={[authModal, setAuthModal]}>
      {children}
    </AuthModalContext.Provider>
  );
};
