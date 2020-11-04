import React, { useEffect, useState } from "react";
import { AuthStatusProvider } from "./context/AuthStatusContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Write from "./components/Write";
import UserSetup from "./components/UserSetup";
import { User } from "./context/UserContext";
import AuthModal from "./components/auth/AuthModal";
import { AuthModal as AuthModalFunction } from "./context/AuthModalContext";

const App = () => {
  const user = User();
  const [authModal, setAuthModal] = AuthModalFunction();
  const [userVerified, setUserVerified] = useState(null);

  useEffect(() => {
    if (user) {
      setUserVerified(user.emailVerified);
    }
  }, [user]);

  if (user === "") {
    return "Loading";
  } else if (userVerified === false) {
    return <UserSetup />;
  }

  return (
    <Router>
      <Switch>
        <AuthStatusProvider>
          {authModal && <AuthModal setAuth={setAuthModal} />}
          <Route path="/" exact component={HomePage} />
          <Route path="/s/signin" exact render={() => <AuthModal />} />
          <Route path="/new-story" exact component={Write} />
        </AuthStatusProvider>
      </Switch>
    </Router>
  );
};

export default App;
