import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { UserProvider } from "./context/UserContext";
import { AuthModalProvider } from "./context/AuthModalContext";
import { CompleteProfileProvider } from "./context/CompleteProfileContext";
import { ToastNotificationProvider } from "./context/ToastNotificationContext";

ReactDOM.render(
  <AuthModalProvider>
    <React.StrictMode>
      <UserProvider>
        <ToastNotificationProvider>
          <CompleteProfileProvider>
            <App />
          </CompleteProfileProvider>
        </ToastNotificationProvider>
      </UserProvider>
    </React.StrictMode>
  </AuthModalProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
