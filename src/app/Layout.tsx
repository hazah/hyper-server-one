import React from "react";
import { Outlet } from "react-router";
import Navigation from "@app/Navigation";

const Layout = () => (
  <div id="layout">
    <Navigation/>
    <Outlet/>
  </div>
);

export default Layout;
