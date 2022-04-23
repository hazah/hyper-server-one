import authDB from "@server/auth/db";
import getUserDBName from "@util/user_db_name";

export { theme } from "theme";

export function fresh({ format, render }) {
  format({
    html: () => render(),
  });
}

export async function make({ format, render, params, req, next }) {
  const { email, password } = params;
  try {
    const users = await authDB();
    const response = await users.signUp(btoa(email), password);

    if (response.ok) {
      const response = await users.logIn(btoa(email), password);

      if (response.ok) {
        const userDBName = getUserDBName(email);

        req.login({ userDBName, email, ...response }, (err) => {
          if (err) {
            return next(err);
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
    if (err.name === 'conflict') {
      // "batman" already exists, choose another username
    } else if (err.name === 'forbidden') {
      // invalid username
    } else {
      // HTTP error, cosmic rays, etc.
    }
    return next(err);
  }

  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Registered" }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
