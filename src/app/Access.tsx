import React, { BaseSyntheticEvent, FunctionComponent } from "react";
import PropTypes from "prop-types";
import { useForm, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

import config from "config";

type FormFields = {
  email?: string;
  password?: string;
};

type EmailPasswordHandler = (
  email?: string,
  password?: string
) => void | Promise<void>;
type LogoutHandler = () => void | Promise<void>;

type AccessHandler = EmailPasswordHandler | LogoutHandler;
type User = {} | { email: string; password: string };

export type AccessProps = {
  onSubmit: AccessHandler;
  user?: User;
};

function useSubmitter(
  submitter: AccessHandler,
  handler: UseFormHandleSubmit<FormFields>
): (e?: BaseSyntheticEvent<object, any, any>) => Promise<void> {
  const onSubmit: SubmitHandler<FormFields> = (data) => {
    const { email, password } = data;
    if (email && password) {
      submitter(email, password);
    } else {
      submitter();
    }
  };

  return handler(onSubmit);
}

function formActionName(user?: User): string {
  return (user && ("email" in user ? "eject" : "authenticate")) || "register";
}

function formMethod(user: User): string {
  return (user && ("email" in user ? "delete" : "post")) || "post";
}

function formAction(user: User): string {
  return (
    (user && ("email" in user ? "/eject" : "/authenticate")) ||
    "/register"
  );
}

function formTitle(user: User): string {
  return (user && ("email" in user ? null : "Authenticate")) || "Register";
}

const Access: FunctionComponent<AccessProps> = ({
  onSubmit,
  user,
}: AccessProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>();

  const method = process.env.MODE === "server-only" ? { method: "post" } : {};

  const required = process.env.MODE === "server-only" ? { required: true } : {};

  return (
    <>
      {(!user || !("email" in user)) ? (
        <form
          onSubmit={useSubmitter(onSubmit, handleSubmit)}
          action={formAction(user)}
          {...method}
        >
          <input type="hidden" name="_method" value={formMethod(user)} />
          <fieldset>
            <legend>{formTitle(user)}</legend>
            <label>
              <strong>email</strong>
              <input
                {...register("email", { required: true })}
                type="email"
                {...required}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
            <label>
              <strong>password</strong>
              <input
                {...register("password", { required: true })}
                type="password"
                {...required}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </label>
            <button type="submit">{formActionName(user)}</button>
          </fieldset>
        </form>
      ) : (
        <>
          <a href={formAction(user)} data-turbo-method={formMethod(user)} style={{ display: config.MODE === "server-only" ? "none" : undefined }}>{formActionName(user)}</a>
          <noscript>
            <form onSubmit={useSubmitter(onSubmit, handleSubmit)}
              action={formAction(user)}
              {...method}
            >
              <input type="hidden" name="_method" value={formMethod(user)} />
              <button type="submit">{formActionName(user)}</button>
            </form>
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
