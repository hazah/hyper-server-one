import React, { BaseSyntheticEvent, FunctionComponent } from "react";
import PropTypes from "prop-types";
import { useForm, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";

type FormFields = {
  email?: string;
  password?: string;
};

type EmailPasswordHandler = (email?: string, password?: string) => void | Promise<void>;
type LogoutHandler = () => void | Promise<void>;

type AccessHandler = EmailPasswordHandler | LogoutHandler;
type User = {} | { email: string, password: string };

export type AccessFormProps = {
  onSubmit: AccessHandler;
  user?: User;
};

function useSubmitter(submitter: AccessHandler, handler: UseFormHandleSubmit<FormFields>): (e?: BaseSyntheticEvent<object, any, any>) => Promise<void> {
  const onSubmit: SubmitHandler<FormFields> = data => {
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
  return user && (("email" in user) ? "eject" : "authenticate") || "register";
}

function formMethod(user: User): string {
  return user && (("email" in user) ? "delete" : "post") || "post";
}

function formAction(user: User): string {
  return user && (("email" in user) ? "/eject" : "/authenticate/new") || "/register/new";
}

function formTitle(user: User): string {
  return user && (("email" in user) ? null : "Authenticate") || "Register";
}

const AccessForm: FunctionComponent<AccessFormProps> = ({ onSubmit, user }: AccessFormProps) => {
  const { register, formState: { errors }, handleSubmit } = useForm<FormFields>();

  return (
    <form onSubmit={useSubmitter(onSubmit, handleSubmit)} method="post" action={formAction(user)}>
      <input type="hidden" name="_method" value={formMethod(user)}/>
      {(!user || !("email" in user)) && (
        <fieldset>
          <legend>{formTitle(user)}</legend>
          <label>
            <strong>email</strong>
            <input {...register("email", { required: true })} type="email" />
            {errors.email && <span>{errors.email.message}</span>}
          </label>
          <label>
            <strong>password</strong>
            <input {...register("password", { required: true })} type="password" />
            {errors.password && <span>{errors.password.message}</span>}
          </label>
        </fieldset>
      )}
      <button type="submit">{formActionName(user)}</button>
    </form>
  );
}

AccessForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired
    })
  ])
};

AccessForm.defaultProps = {
  user: undefined
}

export default AccessForm;
