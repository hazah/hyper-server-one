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


export type AccessFormProps = {
  onSubmit: AccessHandler;
  user?: {} | { email: string, password: string };
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


const AccessForm: FunctionComponent<AccessFormProps> = ({ onSubmit, user }: AccessFormProps) => {
  const { register, formState: { errors }, handleSubmit } = useForm<FormFields>();

  return (
    <form onSubmit={useSubmitter(onSubmit, handleSubmit)}>
      {(!user || !("email" in user)) && (
        <aside>
          <section>
            <label>
              <strong>email</strong>
              <input {...register("email", { required: true })} type="email" />
              {errors.email && <span>{errors.email.message}</span>}
            </label>
          </section>
          <section>
            <label>
              <strong>password</strong>
              <input {...register("password", { required: true })} type="passowrd" />
              {errors.password && <span>{errors.password.message}</span>}
            </label>
          </section>
        </aside>
      )}
      <button type="submit">{user && (("email" in user) ? "logout" : "login") || "register"}</button>
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
