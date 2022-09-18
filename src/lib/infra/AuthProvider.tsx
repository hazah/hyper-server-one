import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";
import PropTypes from "prop-types";
import authenticator from "@client/auth";

type Auth = {
  authenticate: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: any;
};

const AuthContext = createContext<Auth>(undefined);

export const useAuth = (): Auth => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within a AuthProvider.");
  }
  return auth;
};

export const AuthProvider = ({
  user,
  children,
}: {
  user: any;
  children: ReactElement;
}): ReactElement => {
  const auth = useAuthentication(user);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuthentication = (initialUser = null) => {
  const [user, setUser] = useState(initialUser);

  const authenticate = async (username: string, password: string) => {
    setUser(await authenticator.authenticate({ username, password }));
  };

  const logout = async () => {
    await authenticator.logout();
    setUser(null);
  };

  return {
    authenticate,
    logout,
    user,
  };
};

AuthProvider.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
