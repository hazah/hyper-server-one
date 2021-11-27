import React from "react";
import "@fontsource/roboto";

import Navigation from "@app/Navigation";
import Router from "@app/Router";
import AccessForm from "@app/AccessForm";

import "i18n";

const App = () => (
  <>
    <AccessForm onSubmit={() => null} user={{ email: "foo" }}/>
    <Navigation />
    <Router />
  </>
);

export default App;
