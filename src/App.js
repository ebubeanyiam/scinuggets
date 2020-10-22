import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { AuthStatusProvider } from "./context/AuthStatusContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AuthModal from "./components/auth/AuthModal";

const App = () => {
  const [authModal, setAuthModal] = useState(false);

  return (
    <UserProvider>
      <Router>
        <AuthStatusProvider>
          <Header setAuth={setAuthModal} />
          {authModal && <AuthModal setAuth={setAuthModal} />}
        </AuthStatusProvider>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <AuthStatusProvider>
            <Route path="/s/signin" render={() => <AuthModal />} />
          </AuthStatusProvider>
        </Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
