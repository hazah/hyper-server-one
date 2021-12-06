import React from "react";
import { Link } from "react-router-dom";
import AccessForm from "@app/AccessForm";

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
    <li>
      <Link to="/authenticate/new">
        authenticate
      </Link>
    </li>
    <li>
      <Link to="/register/new">
        register
      </Link>
    </li>
    <li>
      <AccessForm user={{ email: 'email@example.com' }} onSubmit={() => null}/>
    </li>
  </ul>
);

export default Navigation;
