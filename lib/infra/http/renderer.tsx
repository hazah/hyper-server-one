import React, { FunctionComponent } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import {
  ServerStyleSheets,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

import theme from "../../../src/theme";
import { Helmet } from "react-helmet";

let js: any;
let css: any;

const syncLoadAssets = () => {
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
  
  const entrypoint = "client";
  const extra = {};

  js = assets[entrypoint].js?.map((asset: string) => <script src={asset} {...extra} key={asset}></script>);
  css = assets[entrypoint].css?.map((asset: string) => <link rel="stylesheet" href={asset} key={asset}/>);
};
syncLoadAssets();

const withAssets = (Component: FunctionComponent) => {
  return ({...props}) => (
    <>
      <Helmet>
        {js}
        {css}
      </Helmet>
      <Component/>
    </>
  );
}


const withTheme = (Component: FunctionComponent, sheets: ServerStyleSheets, theme: any) => {
  return ({...props}) => sheets.collect(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...props}/>
    </ThemeProvider>
  );
}

const withRouter = (Component: FunctionComponent) => {
  return ({ url, ...props }): JSX.Element => {
    return (
      <StaticRouter location={url}>
        <Component {...props}/>
      </StaticRouter>
    );
  }
}

export default async function jsxEngine(path: string, options: any, callback: (e: any, rendered?: string) => void): Promise<void> {
  const isStatic = !!options.static;
  const isApp = !!options.app;
  const sheets = options.sheets;
  
  const render = isStatic ? renderToStaticMarkup : renderToString;
    
  delete options.static;
  delete options.app;

  try {
    let Component = require(`@app/${path.substring(0, path.length - 4).split("/app/")[1]}`).default;
    
    Component = isApp ? withAssets(Component) : Component;
    Component = isApp ? withTheme(Component, sheets, theme) : Component;
    Component = isApp ? withRouter(Component) : Component;
    
    callback(null, render(<Component {...options}/>));
  } catch (error) {
    callback(error);
  }
}
