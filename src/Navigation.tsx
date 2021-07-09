import React from "react";
import { Link } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';

const Navigation = () => (
  <ul>
    <li><Link component={RouterLink} to="/" href="/">home</Link></li>
    <li><Link component={RouterLink} to="/about" href="/about">about</Link></li>
  </ul>
);

export default Navigation;
