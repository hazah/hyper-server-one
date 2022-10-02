export { theme } from "theme";

export function display({ format, render }) {
  format({
    html: () => render(),
  });
}
