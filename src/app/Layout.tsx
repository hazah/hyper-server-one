import React from "react";
import { Outlet } from "react-router";
import { styled } from '@mui/system';
import Navigation from "@app/Navigation";

const Wrapper = styled('div')({
  height: '100%',
});

const Layout = () => (
  <Wrapper>
    <Navigation/>
    <Outlet/>
  </Wrapper>
);

export default Layout;
