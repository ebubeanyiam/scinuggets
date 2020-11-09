import React, { useEffect } from "react";

import { Toast } from "../static/staticData";

import "../style/toast-notification.css";

const ToastNotification = () => {
  useEffect(() => {
    const props = Toast();
    console.log(props);
  });

  return (
    <div className="toast-notification">
      <div>
        <h1>""</h1>
        <div className="toast-notification__status-indicator"></div>
      </div>
      <div>
        <p>""</p>
      </div>
    </div>
  );
};

export default ToastNotification;
