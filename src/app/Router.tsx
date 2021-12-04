import React from "react";
import { Routes } from "react-router-dom";

import routes from "routes";

const Router = () => (
  <Routes>
    {routes("client")}
  </Routes>
);

export default Router;
