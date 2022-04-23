import PouchDB from "pouchdb";
import DatabaseAuthentication from "pouchdb-auth";

PouchDB.plugin(DatabaseAuthentication);

export default async () => {
  const users = new PouchDB("http://localhost:5984/_users", {
    skip_setup: true,
    auth: {
      username: "admin",
      password: "admin"
    }
  });

  await users.useAsAuthenticationDB();

  return users;
};
