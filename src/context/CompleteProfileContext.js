import React, { useState, createContext, useContext } from "react";

export const CompleteProfileContext = createContext();

export const ProfileReg = () => {
  return useContext(CompleteProfileContext);
};

export const CompleteProfileProvider = ({ children }) => {
  const [openProfileReg, setOpenProfileReg] = useState(false);

  return (
    <CompleteProfileContext.Provider
      value={[openProfileReg, setOpenProfileReg]}
    >
      {children}
    </CompleteProfileContext.Provider>
  );
};
