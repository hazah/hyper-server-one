import React from "react";
import "@fontsource/roboto";

import Navigation from "@app/Navigation";
import Router from "@app/Router";
import AccessForm from "@app/AccessForm";

import "i18n";

const App = () => (
  <>
    <Navigation />
    <Router />
    <AccessForm onSubmit={() => null}/>
    <AccessForm onSubmit={() => null} user={{}}/>
    <AccessForm onSubmit={() => null} user={{ email: "foo" }}/>
  </>
);

export default App;
