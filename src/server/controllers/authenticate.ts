import theme from "theme";

export function fresh({ format, render, user }) {
  format({
    html: () => render({ theme, user }),
  });
}

export function make({ format, render, user }) {
  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Authenticated", theme, user }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
