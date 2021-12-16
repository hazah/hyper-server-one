import theme from "theme";

export function display({ format, render, user }) {
  format({
    html: () => render({ theme, user }),
  });
}
