export { theme } from "theme";

export function fresh({ format, render }) {
  format({
    html: () => render(),
  });
}

export function make({ format, redirect }) {
  format({
    "text/html": () => redirect("/"),
  });
}
