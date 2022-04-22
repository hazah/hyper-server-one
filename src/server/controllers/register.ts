import theme from "theme";
import PouchDB from "pouchdb";
import DatabaseAuthentication from "pouchdb-auth";

PouchDB.plugin(DatabaseAuthentication);

export function fresh({ format, render, user }) {
  format({
    html: () => render({ theme, user }),
  });
}

export async function make({ format, render, user, params }) {
  const users = new PouchDB("http://localhost:5984/_users", {
    skip_setup: true,
    auth: {
      username: "admin",
      password: "admin"
    }
  });
  
  await users.useAsAuthenticationDB();

  const { email, password } = params;

  try {
    const response = await users.signUp(btoa(email), password);
    console.log(response);
  } catch (err) {
    console.log(err);
    if (err.name === 'conflict') {
      // "batman" already exists, choose another username
    } else if (err.name === 'forbidden') {
      // invalid username
    } else {
      // HTTP error, cosmic rays, etc.
    }
  }

  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Registered", theme, user }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
