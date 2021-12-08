import theme from "theme";

export function erase({ format, render }) {
  format({
    "text/vnd.turbo-stream.html": () => render({ template: "Ejected", theme }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
