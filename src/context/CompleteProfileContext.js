import React, { useState, createContext, useContext, useEffect } from "react";
import { UserData } from "./UserContext";

export const CompleteProfileContext = createContext();

export const ProfileReg = () => {
  return useContext(CompleteProfileContext);
};

export const CompleteProfileProvider = ({ children }) => {
  const userData = UserData();
  const [openProfileReg, setOpenProfileReg] = useState(false);

  useEffect(() => {
    if (userData) {
      !userData.username ? setOpenProfileReg(true) : setOpenProfileReg(false);
    }
  }, [userData]);

  return (
    <CompleteProfileContext.Provider
      value={[openProfileReg, setOpenProfileReg]}
    >
      {children}
    </CompleteProfileContext.Provider>
  );
};
