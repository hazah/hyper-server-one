import React from "react";
import { Outlet, useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

import Navigation from "@app/Navigation";

const Wrapper = styled("main")({
  height: "100%",
});

const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <Wrapper>
      <Helmet>
        <title>{t(location.pathname)}</title>
      </Helmet>

      <h1>{t(location.pathname)}</h1>
      <Navigation />
      <Outlet />
      <div id="message" data-turbo-permanent></div>
    </Wrapper>
  );
};

export default Layout;
