import PouchDB from "pouchdb";

export default async (userDBName: string) => {
  const events = new PouchDB(`http://localhost:5984/${userDBName}`, {
    skip_setup: true,
    auth: {
      username: "admin",
      password: "admin"
    }
  });

  return events;
};
