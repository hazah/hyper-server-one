import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => (
  <ul>
    <li>
      <Link to="/">
        home
      </Link>
    </li>
    <li>
      <Link to="/about">
        about
      </Link>
    </li>
  </ul>
);

export default Navigation;
