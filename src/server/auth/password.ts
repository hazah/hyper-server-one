import { IVerifyOptions, Strategy } from "passport-local";
// import PouchDB from "pouchdb";
// import DatabaseAuthentication from "pouchdb-auth";

// PouchDB.plugin(DatabaseAuthentication);

const password = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (
    username: string,
    password: string,
    done: (error: any, user?: any, options?: IVerifyOptions) => void
  ) => {
    
    // const users = new PouchDB("http://localhost:5984/_users");
    // await users.useAsAuthenticationDB();

    // const response = await users.logIn(username, password);

    // console.log(response);

    // if (response.ok) {
    //   const usernameHex = Array.from(username).map((c) => c.charCodeAt(0).toString(16)).join('');
    //   const userDBName = `userdb-${usernameHex}`;

    //   done(null, { userDBName, ...response });
    // } else {
    //   done(response);
    // }
    done(null, { username });
  }
);

export default password;

export const deserialize = (
  id: unknown,
  done: (err: any, id?: unknown) => void
) => {;done(null, JSON.parse(id as string));}

export const serialize = (
  user: Express.User,
  done: (err: any, user?: false | Express.User) => void
) => {;done(null, JSON.stringify(user))};
