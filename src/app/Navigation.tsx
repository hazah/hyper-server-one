import React from "react";
import { Link } from "react-router-dom";
import Access from "@app/Access";

const Navigation = () => (
  <nav>
    <ul>
      <li>
        <Link to="/">home</Link>
      </li>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/authenticate/new">authenticate</Link>
      </li>
      <li>
        <Link to="/register/new">register</Link>
      </li>
      <li>
        <Access
          user={{ email: "email@example.com" }}
          onSubmit={() => null}
        />
      </li>
    </ul>
  </nav>
);

export default Navigation;
