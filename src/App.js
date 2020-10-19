import React, { useState } from "react";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import HomePage from "./components/HomePage";
import AuthModal from "./components/auth/AuthModal";

const App = () => {
  const [authModal, setAuthModal] = useState(false);

  return (
    <UserProvider>
      <Router>
        <Header setAuth={setAuthModal} />
        {authModal && <AuthModal />}
        <Switch>
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
