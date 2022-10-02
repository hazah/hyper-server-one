type EmailPasswordHandler = (
  email?: string,
  password?: string
) => void | Promise<void>;
type LogoutHandler = () => void | Promise<void>;

type AccessHandler = EmailPasswordHandler | LogoutHandler;

export default AccessHandler;
