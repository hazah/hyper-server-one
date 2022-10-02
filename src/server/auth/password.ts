import { Strategy } from "passport-local";
import authDB from "@server/auth/db";
import eventsDB from "@app/events/db";
import getUserDBName from "@util/user_db_name";

type Done = (error: any, user?: any) => void;

export async function login(
  email: string,
  password: string,
  done: Done
): Promise<void> {
  try {
    const users = await authDB();
    const response = await users.logIn(btoa(email), password);

    if (response.ok) {
      const userDBName = getUserDBName(email);

      const events = await eventsDB(userDBName);

      await events.post({
        name: "login",
        timestamp: Date.now(),
      });

      done(null, { userDBName, email, ...response });
    } else {
      done(response);
    }
  } catch (error) {
    console.error("login", error);
    done(error);
  }
}

export async function register(
  email: string,
  password: string,
  done: Done
): Promise<void> {
  try {
    const users = await authDB();
    const response = await users.signUp(btoa(email), password);

    if (response.ok) {
      const events = await eventsDB(getUserDBName(email));

      await events.post({
        name: "register",
        timestamp: Date.now(),
      });

      await login(email, password, done);
    } else {
      done(response);
    }
  } catch (error) {
    if (error.name === "conflict") {
      // "batman" already exists, choose another username
    } else if (error.name === "forbidden") {
      // invalid username
    } else {
      // HTTP error, cosmic rays, etc.
    }
    console.error("register:", error);
    done(error);
  }
}

export function deserialize(id: unknown, done: Done): void {
  done(null, JSON.parse(id as string));
}

export function serialize(user: Express.User, done: Done): void {
  done(null, JSON.stringify(user));
}

const password = new Strategy(
  { usernameField: "email", passwordField: "password" },
  login
);

export default password;
