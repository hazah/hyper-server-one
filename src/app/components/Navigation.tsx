import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";

import { useAuth } from "@infra/AuthProvider";
import Access from "@components/Access";

const Container = styled("ul")({
  margin: "0px",
});

const Navigation = () => {
  const { user } = useAuth();

  return (
    <nav>
      <Container>
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
                user={user}
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
      </Container>
    </nav>
  );
}

export default Navigation;
