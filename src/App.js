import React from "react";
import { UserProvider } from "./context/UserContext";
import { AuthStatusProvider } from "./context/AuthStatusContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Write from "./components/Write";
import AuthModal from "./components/auth/AuthModal";
import { AuthModal as AuthModalFunction } from "./context/AuthModalContext";

const App = () => {
  const [authModal, setAuthModal] = AuthModalFunction();

  return (
    <UserProvider>
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
    </UserProvider>
  );
};

export default App;
