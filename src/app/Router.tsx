import React from "react";
import { Switch, Route } from "react-router-dom";
import About from "./screens/About";
import Home from "./screens/Home";

const Router = () => (
  <Switch>
    <Route path="/about" component={About} />
    <Route path="/" component={Home} />
  </Switch>
);

export default Router;
