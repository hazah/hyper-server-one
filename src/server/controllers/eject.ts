import theme from "theme";

export function erase({ format, render, user }) {
  format({
    "text/vnd.turbo-stream.html": () =>
      render({ template: "Ejected", theme, user }),
    "text/html": () => render({ template: "Redirect", to: "/" }),
  });
}
