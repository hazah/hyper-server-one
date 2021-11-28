import React from "react";
import { Switch } from "react-router-dom";

import routes from "routes";

const Router = () => (
  <Switch>
    {routes("client")}
  </Switch>
);

export default Router;
