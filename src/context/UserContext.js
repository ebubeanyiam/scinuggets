import React, { useState, createContext } from "react";
import { auth } from "../firebase/config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("");

  auth.onAuthStateChanged((user) => {
    setUser(user);
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
