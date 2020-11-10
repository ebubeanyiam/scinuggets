import React, { useState, createContext, useContext } from "react";

const ToastNotificationContext = createContext();

export const ToastOpen = () => {
  return useContext(ToastNotificationContext);
};

export const ToastNotificationProvider = ({ children }) => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  return (
    <ToastNotificationContext.Provider
      value={[
        toastOpen,
        setToastOpen,
        toastStatus,
        setToastStatus,
        toastMessage,
        setToastMessage,
      ]}
    >
      {children}
    </ToastNotificationContext.Provider>
  );
};
