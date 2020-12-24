import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import NewStory from "./components/NewStory";
import ConfirmMail from "./components/ConfirmMail";
import Blog from "./components/Blog";
import AuthModal from "./components/auth/AuthModal";
import ScreenLoader from "./components/ScreenLoader";
import PageNotFound from "./components/PageNotFound";
import UserManagement from "./components/UserManagement";
import CompleteRegPopUp from "./components/CompleteRegPopUp";
import ToastNotification from "./components/ToastNotification";

// Contexts
import { User } from "./context/UserContext";
import { ProfileReg } from "./context/CompleteProfileContext";
import { AuthStatusProvider } from "./context/AuthStatusContext";
import { AuthModal as AuthModalFunction } from "./context/AuthModalContext";
import { Theme } from "./context/ThemeContext";

const App = () => {
  const user = User();
  const [profileReg] = ProfileReg();
  const userActionUrl = "/user/action";
  const [darkMode] = Theme();
  const [authModal, setAuthModal] = AuthModalFunction();
  const [userVerified, setUserVerified] = useState(null);

  useEffect(() => {
    if (user) {
      setUserVerified(user.emailVerified);
    }
  }, [user]);

  if (user === "") {
    return <ScreenLoader />;
  }

  return (
    <div className={darkMode && "bg-mode--dark"}>
      <Router>
        <ToastNotification />
        {userVerified === false &&
          window.location.pathname !== userActionUrl && <ConfirmMail />}

        {profileReg && <CompleteRegPopUp />}

        <Switch>
          <AuthStatusProvider>
            {userVerified !== false && (
              <>
                <Route path="/" exact component={HomePage} />
                {authModal && <AuthModal setAuth={setAuthModal} />}
                <Route path="/s/signin" exact render={() => <AuthModal />} />
                <Route path="/m/new-story" exact component={NewStory} />
                <Route
                  path="/p/:id"
                  render={(props) => <NewStory {...props} />}
                />
              </>
            )}
            <Route path="/:id" exact render={(props) => <Blog {...props} />} />
            <Route
              path="/user/action"
              exact
              render={(props) => <UserManagement {...props} />}
            />
          </AuthStatusProvider>
          <Route path="" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
