import React from "react";
import { Outlet, useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";

import { useAuth } from "@infra/AuthProvider";
import Navigation from "@components/Navigation";

const Wrapper = styled("div")({
  height: "100%",
});

const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const auth = useAuth();

  return (
    <>
      <Helmet>
        <title>{t(location.pathname)}</title>
      </Helmet>
      <Wrapper>
        <Navigation />
        <h1>{t(location.pathname)}</h1>
        <Outlet />
        <div id="message" data-turbo-permanent>{auth.user ? JSON.stringify(auth.user) : ''}</div>
      </Wrapper>
    </>
  );
};

export default Layout;
