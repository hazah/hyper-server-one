export { theme } from "theme";

export function fresh({ format, render }) {
  format({
    html: () => render(),
  });
}

export function make({ format, render }) {
  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Authenticated" }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
