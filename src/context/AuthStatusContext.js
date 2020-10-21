import React, { useState, createContext, useContext } from "react";

const AuthStatusContext = createContext();

export function AuthStatus() {
  return useContext(AuthStatusContext);
}

export const AuthStatusProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(null);

  return (
    <AuthStatusContext.Provider value={[authStatus, setAuthStatus]}>
      {children}
    </AuthStatusContext.Provider>
  );
};
