import theme from "theme";
import authDB from "../auth_db";

export function fresh({ format, render, user }) {
  format({
    html: () => render({ theme, user }),
  });
}

export async function make({ format, render, user, params }) {
  const { email, password } = params;
  try {
    const users = await authDB();
    const response = await users.signUp(btoa(email), password);
  } catch (err) {
    console.error(err);
    if (err.name === 'conflict') {
      // "batman" already exists, choose another username
    } else if (err.name === 'forbidden') {
      // invalid username
    } else {
      // HTTP error, cosmic rays, etc.
    }
    throw err;
  }

  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Registered", theme, user }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
