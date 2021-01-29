import React, { useEffect, useState } from "react";
import { TiWarningOutline } from "react-icons/ti";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import NewStory from "./components/NewStory";
import EditStory from "./components/EditStory";
import ConfirmMail from "./components/ConfirmMail";
import Blog from "./components/Blog";
import AuthModal from "./components/auth/AuthModal";
import ScreenLoader from "./components/ScreenLoader";
import PageNotFound from "./components/PageNotFound";
import UserManagement from "./components/UserManagement";
import CompleteRegPopUp from "./components/CompleteRegPopUp";

// Contexts
import { User } from "./context/UserContext";
import { ProfileReg } from "./context/CompleteProfileContext";
import { AuthStatusProvider } from "./context/AuthStatusContext";
import { AuthModal as AuthModalFunction } from "./context/AuthModalContext";
import { Theme } from "./context/ThemeContext";
import ProfileSettings from "./components/user-components/ProfileSettings";

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
    <div className={darkMode ? "bg-mode--dark" : ""}>
      <div className="app__caution-sign">
        <TiWarningOutline />
        <span>
          Certain parts of the app are in development and will be unavailable.{" "}
          <a href="/">Learn more</a>
        </span>
      </div>
      <Router>
        {userVerified === false &&
          window.location.pathname !== userActionUrl && <ConfirmMail />}
        {profileReg && <CompleteRegPopUp />}

        <AuthStatusProvider>
          {authModal && <AuthModal setAuth={setAuthModal} />}
          <Switch>
            <>
              <Route path="/" exact component={HomePage} />
              <Route
                path="/s/signin"
                exact
                render={() => (user ? <HomePage /> : <AuthModal />)}
              />
              <Route
                path="/m/new-story"
                exact
                render={(props) =>
                  user ? (
                    <NewStory {...props} />
                  ) : (
                    <AuthModal setAuth={setAuthModal} />
                  )
                }
              />
              <Route
                path="/me/settings"
                exact
                render={() =>
                  user ? (
                    <ProfileSettings />
                  ) : (
                    <AuthModal setAuth={setAuthModal} />
                  )
                }
              />
              <Route
                path="/p/:id"
                exact
                render={(props) =>
                  user ? (
                    <NewStory {...props} />
                  ) : (
                    <AuthModal setAuth={setAuthModal} />
                  )
                }
              />
              <Route
                path="/:id/edit"
                exact
                render={(props) =>
                  user ? (
                    <EditStory {...props} />
                  ) : (
                    <AuthModal setAuth={setAuthModal} />
                  )
                }
              />
              <Route
                path="/:id"
                exact
                render={(props) => <Blog {...props} />}
              />
              <Route
                path="/user/action"
                exact
                render={(props) =>
                  user ? <UserManagement {...props} /> : <HomePage />
                }
              />
            </>
            <Route path="" component={PageNotFound} />
          </Switch>
        </AuthStatusProvider>
      </Router>
    </div>
  );
};

export default App;
