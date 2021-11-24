import React, { FormEvent, useCallback, useState } from "react";
import PropTypes from "prop-types";

export type LoginFormProps = {
  onSubmit: (email: string, password: string) => void;
};

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(email, password); }}>
      <section>
        <label>
          <strong>email</strong>
          <input name="email" value={email} onChange={e => setEmail(e.target.value)}/>
        </label>
      </section>
      <section>  
        <label>
          <strong>password</strong>
          <input name="password" value={password} type="password" onChange={e => setPassword(e.target.value)}/>
        </label>
      </section>

      <button type="submit">login</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
