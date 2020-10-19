import React from "react";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header />

        <Switch>{/* <Route path="/" component={HomePage} /> */}</Switch>
      </Router>
    </UserProvider>
  );
};

export default App;
