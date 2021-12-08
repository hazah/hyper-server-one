import React, { FunctionComponent } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import { Helmet } from "react-helmet";

let js: any;
let css: any;

const syncLoadAssets = () => {
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

  const entrypoint = "client";
  const extra = {};

  js = assets[entrypoint].js?.map((asset: string) => (
    <script src={asset} {...extra} key={asset}></script>
  ));
  css = assets[entrypoint].css?.map((asset: string) => (
    <link rel="stylesheet" href={asset} key={asset} />
  ));
};
syncLoadAssets();

const withAssets = () => (Component: FunctionComponent) => {
  return ({ ...props }) => (
    <>
      <Helmet>
        {js}
        {css}
        {process.env.NODE_ENV === "development" && (
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap"
            rel="stylesheet"
          />
        )}
      </Helmet>
      <Component {...props} />
    </>
  );
};

const withTheme = (theme: any, cache: any) => (
  Component: FunctionComponent
) => {
  return ({ ...props }) => (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    </CacheProvider>
  );
};

const withRouter = (url: string) => (Component: FunctionComponent) => {
  return ({ ...props }): JSX.Element => {
    return (
      <StaticRouter location={url}>
        <Component {...props} />
      </StaticRouter>
    );
  };
};

export default async function jsxEngine(
  path: string,
  { url, isStatic, isApp, isLayout, theme, cache, ...options }: any,
  callback: (e: any, rendered?: string) => void
): Promise<void> {
  try {
    let Component = require(`@app/${
      path.substring(0, path.length - 4).split("/app/")[1]
    }`).default;

    if (isApp) {
      Component = withRouter(url)(Component);
      Component = withTheme(theme, cache)(Component);
      Component = withAssets()(Component);
    } else if (!isLayout) {
      Component = withTheme(theme, cache)(Component);
    }

    const render = isStatic ? renderToStaticMarkup : renderToString;

    callback(null, render(<Component {...options} />));
  } catch (error) {
    callback(error);
  }
}
