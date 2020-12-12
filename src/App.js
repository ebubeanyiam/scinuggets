import React, { useEffect, useState } from "react";
import { AuthStatusProvider } from "./context/AuthStatusContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import NewStory from "./components/NewStory";
import ConfirmMail from "./components/ConfirmMail";
import Blog from "./components/Blog";
import { User } from "./context/UserContext";
import AuthModal from "./components/auth/AuthModal";
import { AuthModal as AuthModalFunction } from "./context/AuthModalContext";
import UserManagement from "./components/UserManagement";
import ToastNotification from "./components/ToastNotification";
import PageNotFound from "./components/PageNotFound";
import ScreenLoader from "./components/ScreenLoader";

const App = () => {
  const user = User();
  const userActionUrl = "/user/action";
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
    <Router>
      <ToastNotification />
      {userVerified === false && window.location.pathname !== userActionUrl && (
        <ConfirmMail />
      )}
      <Switch>
        <AuthStatusProvider>
          {userVerified !== false && (
            <>
              <Route path="/" exact component={HomePage} />
              {authModal && <AuthModal setAuth={setAuthModal} />}
              <Route path="/s/signin" exact render={() => <AuthModal />} />
              <Route path="/new-story" exact component={NewStory} />
              <Route
                path="/p/:id"
                render={(props) => <NewStory {...props} />}
              />
            </>
          )}
          <Route path="/:id" render={(props) => <Blog {...props} />} />
          <Route
            path="/user/action"
            exact
            render={(props) => <UserManagement {...props} />}
          />
        </AuthStatusProvider>
        <Route path="" component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
