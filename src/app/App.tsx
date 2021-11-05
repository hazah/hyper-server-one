import React from "react";
import { Route, Switch } from "react-router-dom";
import "@fontsource/roboto";

import Home from "@app/screens/Home";
import About from "@app/screens/About";

import Navigation from "@app/Navigation";

const Router = () => (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/" component={Home} />
  </Switch>
);

const App = () => (
  <>
    <Navigation />
    <Router />
  </>
);

export default App;
