import PouchDB from "pouchdb";
import DatabaseAuthentication from "pouchdb-auth";

PouchDB.plugin(DatabaseAuthentication);

let users: PouchDB.Database<{}>;

export default async () => {
  if (users === undefined || users === null) {
    users = new PouchDB("http://localhost:5984/_users", {
      skip_setup: true,
      auth: {
        username: "admin",
        password: "admin"
      }
    });

    await users.useAsAuthenticationDB();
  }

  return users;
};
