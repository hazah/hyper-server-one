import { IVerifyOptions, Strategy } from 'passport-local';

const password = new Strategy(async (username: string, _password: string, done: (error: any, user?: any, options?: IVerifyOptions) => void) => {
  // const _users = new Database('_users');
  // await _users.useAsAuthenticationDB();

  // const response = await _users.logIn(username, password);

  // if (response.ok) {
  //   const usernameHex = Array.from(username).map((c) => c.charCodeAt(0).toString(16)).join('');
  //   const userDBName = `userdb-${usernameHex}`;

  //   done(null, { userDBName, ...response });
  // } else {
  //   done(response);
  // }
  done(null, { username });
});

export default password;

export const deserialize = (user: Express.User, done: (err: any, id?: unknown) => void) => 
  done(null, JSON.stringify(user));
    
export const serialize = (id: unknown, done: (err: any, user?: false | Express.User) => void) => 
  done(null, JSON.parse(id as string));