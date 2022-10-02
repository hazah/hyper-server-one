import React, { FunctionComponent } from "react";
import {
  useForm,
  UseFormRegister,
  FieldError,
} from "react-hook-form";

import FormFields from "@components/access/form_fields";
import useSubmitter from "@components/access/submit";
import User from "@components/access/user";
import FormProps from "@components/access/props";

type Errors = {
  email?: FieldError;
  password?: FieldError;
};

type FieldSetProps = {
  register: UseFormRegister<FormFields>;
  user: User;
  errors: Errors;
};

function authText(
  user?: User,
  logged_in?: string,
  registered?: string,
  unregistered?: string
) {
  return (user && ("email" in user ? logged_in : registered)) || unregistered;
}

function formActionName(user?: User): string {
  return authText(user, "eject", "authenticate", "register");
}

function formMethod(user: User): string {
  return authText(user, "delete", "post", "post");
}

function formAction(user: User): string {
  return authText(user, "/eject", "/authenticate", "/register");
}

function formTitle(user: User): string {
  return authText(user, null, "Authenticate", "Register");
}

export const Link: FunctionComponent<{ user: User }> = ({ user }) => {
  return (
    <a
      href={formAction(user)}
      data-turbo-method={formMethod(user)}
      style={{
        display: process.env.MODE === "server-only" ? "none" : undefined,
      }}
    >
      {formActionName(user)}
    </a>
  );
};

const FieldSet: FunctionComponent<FieldSetProps> = ({
  register,
  user,
  errors,
}) => {
  if (user && "email" in user) {
    return null;
  }

  const required = process.env.MODE === "server-only" ? { required: true } : {};

  return (
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
  );
};

const Form: FunctionComponent<FormProps> = ({ user, onSubmit }: FormProps) => {
  const method = process.env.MODE === "server-only" ? { method: "post" } : {};

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>();

  return (
    <form
      onSubmit={useSubmitter(onSubmit, handleSubmit)}
      action={formAction(user)}
      {...method}
    >
      <input type="hidden" name="_method" value={formMethod(user)} />
      <FieldSet register={register} errors={errors} user={user} />
      <button type="submit">{formActionName(user)}</button>
    </form>
  );
};

export default Form;
