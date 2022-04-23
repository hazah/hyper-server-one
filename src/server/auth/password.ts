import { IVerifyOptions, Strategy } from "passport-local";
import authDB from "../auth_db";
import getUserDBName from "@util/user_db_name";

const password = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (
    email: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ) => {
    try {
      const users = await authDB();
      const response = await users.logIn(btoa(email), password);

      if (response.ok) {
        const userDBName = getUserDBName(email);

        done(null, { userDBName, email, ...response });
      } else {
        done(response);
      }
    } catch (err) {
      console.error(err);
      done(err);
    }
  }
);

export default password;

export const deserialize = (
  id: unknown,
  done: (err: any, id?: unknown) => void
) => {
  done(null, JSON.parse(id as string));
};

export const serialize = (
  user: Express.User,
  done: (err: any, user?: false | Express.User) => void
) => {
  done(null, JSON.stringify(user));
};
