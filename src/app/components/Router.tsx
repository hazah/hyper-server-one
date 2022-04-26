import React from "react";
import { Route, Routes } from "react-router-dom";

import routes from "routes";
import Layout from "@components/Layout";

const Router = () => (
  <Routes>
    <Route element={<Layout />}>{routes("client")}</Route>
  </Routes>
);

export default Router;
