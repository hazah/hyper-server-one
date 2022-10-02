import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";

import Props from "@components/access/props";
import Form, { Link } from "@components/access/Form";

const Access: FunctionComponent<Props> = ({ onSubmit, user }: Props) => {
  return (
    <>
      {!user || !("email" in user) ? (
        <Form onSubmit={onSubmit} user={user} />
      ) : (
        <>
          <Link user={user} />
          <noscript>
            <Form onSubmit={onSubmit} user={user} />
          </noscript>
        </>
      )}
    </>
  );
};

Access.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
    }),
  ]),
};

Access.defaultProps = {
  user: undefined,
};

export default Access;
