export { theme } from "theme";

export function erase({ format, render }) {
  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Ejected" }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
