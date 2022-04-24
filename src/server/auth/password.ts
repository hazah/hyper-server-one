import { IVerifyOptions, Strategy } from "passport-local";
import authDB from "@server/auth/db";
import eventsDB from "@app/events/db";
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
    return await login(email, password, done);
  }
);

export const login = async (
  email: string,
  password: string,
  done: (error: any, user?: any) => void,
  sendEvent: boolean = true
) => {
  try {
    const users = await authDB();
    const response = await users.logIn(btoa(email), password);

    if (response.ok) {
      const userDBName = getUserDBName(email);

      if (sendEvent) {
        const events = await eventsDB(userDBName);

        await events.post({
          name: 'login',
          timestamp: Date.now(),
        });
      }

      done(null, { userDBName, email, ...response });
    } else {
      done(response);
    }
  } catch (error) {
    console.error('login', error);
    done(error);
  }
};

export const register = async (
  email: string,
  password: string,
  done: (error: any, user?: any) => void
) => {
  try {
    const users = await authDB();
    const response = await users.signUp(btoa(email), password);

    if (response.ok) {
      await login(email, password, done, false);

      const events = await eventsDB(getUserDBName(email));

      await events.post({
        name: 'register',
        timestamp: Date.now(),
      });
      
      await events.post({
        name: 'login',
        timestamp: Date.now(),
      });
    } else {
      done(response);
    }
  } catch (error) {
    if (error.name === 'conflict') {
      // "batman" already exists, choose another username
    } else if (error.name === 'forbidden') {
      // invalid username
    } else {
      // HTTP error, cosmic rays, etc.
    }
    console.error('register:', error);
    done(error);
  }
};

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
