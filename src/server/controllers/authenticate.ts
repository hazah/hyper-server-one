import theme from "theme";

export function fresh({ format, render }) {
  format({
    html: () => render({ theme }),
  });
}

export function make({ format, render }) {
  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Authenticated", theme }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
