import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AuthModal from "./components/auth/AuthModal";

const App = () => {
  const [authModal, setAuthModal] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  return (
    <UserProvider>
      <Router>
        <Header setAuth={setAuthModal} authStatus={setAuthStatus} />
        {authModal && <AuthModal setAuth={setAuthModal} status={authStatus} />}
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
