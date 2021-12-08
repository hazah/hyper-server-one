import React from "react";
import { Link } from "react-router-dom";
import Access from "@app/Access";
import { styled } from "@mui/system";

const UL = styled("ul")({
  margin: "0px"
});

const Navigation = () => (
  <nav>
    <UL>
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
    </UL>
  </nav>
);

export default Navigation;
