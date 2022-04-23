// https://www.typescriptlang.org/docs/handbook/modules.html#ambient-modules

export declare module "*.svg" {
  const src: string;
  export default src;
}

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      "turbo-stream": any;
    }
  }

  namespace Express {
    interface Request {
      // usersDb?: PouchDB.Database;
      session?: { passport: { user: { username: string } } };
    }
  }

  namespace PouchDB {
    interface Database {
      putSecurity(doc, cb?);
      useAsAuthenticationDB();
      signUp(name, password);
      logIn(name, password);
    }
  }

  interface Window {
    env: { [envVariable: string]: string | number };
    __WB_MANIFEST: any;
  }
}
