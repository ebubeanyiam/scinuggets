import React, { useEffect, useState } from "react";
import { TiWarningOutline } from "react-icons/ti";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { paths } from "./components/Logic";

import Blog from "./components/Blog";
import Header from "./components/Header";
import Profile from "./components/Profile";
import HomePage from "./components/HomePage";
import NewStory from "./components/NewStory";
import EditStory from "./components/EditStory";
import ConfirmMail from "./components/ConfirmMail";
import AuthModal from "./components/auth/AuthModal";
import ScreenLoader from "./components/ScreenLoader";
import PageNotFound from "./components/PageNotFound";
import UserManagement from "./components/UserManagement";
import CompleteRegPopUp from "./components/CompleteRegPopUp";
import ProfileSettings from "./components/user-components/ProfileSettings";

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
  const [dropDown, setDropDown] = useState(false);
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
    <div
      className={darkMode ? "bg-mode--dark" : ""}
      onClick={(e) => {
        !e.target.classList.contains("header__menu--dropdown") &&
          dropDown &&
          setDropDown(false);
      }}
    >
      <div className="app__caution-sign">
        <TiWarningOutline />
        <span>
          Certain parts of the app are in development and will be unavailable.{" "}
          <a href="/">Learn more</a>
        </span>
      </div>
      <Router>
        {!paths.includes(window.location.pathname) && (
          <Header dropDown={dropDown} setDropDown={setDropDown} />
        )}
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
                path="/profile/:id"
                exact
                render={(props) => <Profile {...props} />}
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
