import React, { createContext, ReactElement, useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";

export type Http = {
  status?: number;
  url?: string;
  readonly static: boolean;
};

const HttpContext = createContext<Http>(undefined);

export const useHttp = (): Http => {
  const http = useContext(HttpContext);
  if (!http) {
    throw new Error("useHttp must be used within a HttpProvider.");
  }
  return http;
};

const HttpProvider = ({
  context,
  children,
}: {
  context: Http;
  children: ReactElement;
}): ReactElement => {
  return (
    <HttpContext.Provider value={context}>{children}</HttpContext.Provider>
  );
};

export const Redirect = ({ to, status }: { to: string, status?: number }) => {
  const http = useHttp();

  if (http.static) {
    http.url = to;
    http.status = status ?? 303;

    return null;
  }
  return <Navigate to={to} />;
};

export const Status = ({ status }) => {
  const http = useHttp();

  if (http.static) {
    http.status = status;
  }
  return null;
};

export default HttpProvider;
