// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

declare module "*.svg" {
  const src: string;
  export default src;
}

declare global {
  namespace Express {
    export interface Request {
      // usersDb?: PouchDB.Database;
      session?: { passport: { user: { username: string } } };
    }
  }

  // namespace PouchDB {
  //   export interface Database {
  //     putSecurity(doc, cb?);
  //     useAsAuthenticationDB();
  //     signUp(name, password);
  //     logIn(name, password);
  //   }
  // }
}
