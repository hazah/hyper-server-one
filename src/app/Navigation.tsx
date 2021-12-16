import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import { useAuth } from "@infra/AuthProvider";
import Access from "@app/Access";

const UL = styled("ul")({
  margin: "0px",
});

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      <UL>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">profile</Link>
            </li>
            <li>
              <Access
                user={{ email: "email@example.com" }}
                onSubmit={() => null}
              />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/authenticate">authenticate</Link>
            </li>
            <li>
              <Link to="/register">register</Link>
            </li>
          </>
        )}
      </UL>
    </nav>
  );
}

export default Navigation;
