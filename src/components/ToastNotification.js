import React from "react";
import { useEffect } from "react";

import { ToastOpen } from "../context/ToastNotificationContext";

import "../style/toast-notification.css";

const ToastNotification = () => {
  const [toastOpen, setToastOpen, toastStatus, , toastMessage, ,] = ToastOpen();

  useEffect(() => {
    if (toastOpen) {
      setTimeout(() => {
        setToastOpen(false);
      }, 3000);
    }
  });

  const indicatorColor = () => {
    const color = toastStatus;

    switch (color) {
      case "success":
        return "#008000";
      case "warning":
        return "#ffff00";
      case "error":
        return "#ff0000";
      default:
        return "#0000ff";
    }
  };

  return (
    <div className={`toast-notification ${toastOpen && "toast-open"}`}>
      <div>
        <h3>{toastStatus}</h3>
      </div>

      <div
        className="toast-notification__status-indicator"
        style={{ background: indicatorColor() }}
      ></div>

      <div>
        <p>{toastMessage}</p>
      </div>
    </div>
  );
};

export default ToastNotification;
