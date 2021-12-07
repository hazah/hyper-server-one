import theme from "theme";

export function erase({ format, redirect, render }) {
  format({
    "text/vnd.turbo-stream.html": () => render({ template: "Ejected", theme }),
    "text/html": () => redirect("/"),
  });
}
