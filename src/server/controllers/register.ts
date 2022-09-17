import { register } from "@server/auth/password";

export { theme } from "theme";

export function fresh({ format, render }) {
  format({
    html: () => render(),
  });
}

export async function make({ format, redirect, params: { email, password }, req, next }) {
  register(email, password, (error: any, user?: any): void => {
    req.login(user, (error) => {
      if (error) {
        return next(error);
      }
  
      format({
        "text/html": () => redirect("/"),
      });
    });
  });
}
