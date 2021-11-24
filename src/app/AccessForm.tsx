import React, { ChangeEvent, FormEvent, FunctionComponent, useCallback, useState } from "react";
import PropTypes from "prop-types";

export type AccessFormProps = {
  onSubmit: (email: string, password: string) => void;
};

function useSetter(setter: React.Dispatch<React.SetStateAction<string>>) {
  return useCallback((event: ChangeEvent<HTMLInputElement>) => setter(event.target.value), []);
}

function useSubmitter(submitter: (email: string, password: string) => void, email: string, password: string) {
  return useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitter(email, password);
  }, [email, password]);
}

const AccessForm: FunctionComponent<AccessFormProps> = ({ onSubmit }: AccessFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={useSubmitter(onSubmit, email, password)}>
      <section>
        <label>
          <strong>email</strong>
          <input name="email" value={email} onChange={useSetter(setEmail)}/>
        </label>
      </section>
      <section>  
        <label>
          <strong>password</strong>
          <input name="password" value={password} type="password" onChange={useSetter(setPassword)}/>
        </label>
      </section>

      <button type="submit">login</button>
    </form>
  );
}

AccessForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AccessForm;
