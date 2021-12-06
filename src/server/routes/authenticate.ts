import theme from "theme";

export function fresh({ format, render }) {
  format({
    html: render({ theme }),
  });
}

export function make({ end, url }) {
  end(url);
}
