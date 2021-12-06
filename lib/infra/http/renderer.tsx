import React, { FunctionComponent } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

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
        {process.env.NODE_ENV === 'development' && 
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>}
      </Helmet>
      <Component {...props}/>
    </>
  );
}


const withTheme = (Component: FunctionComponent, theme: any) => {
  return ({...props}) => (
      <Component {...props}/>
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
  
  const render = isStatic ? renderToStaticMarkup : renderToString;
    
  delete options.static;
  delete options.app;

  try {
    let Component = require(`@app/${path.substring(0, path.length - 4).split("/app/")[1]}`).default;
    
    Component = isApp ? withAssets(Component) : Component;
    Component = isApp ? withTheme(Component, theme) : Component;
    Component = isApp ? withRouter(Component) : Component;
    
    callback(null, render(<Component {...options}/>));
  } catch (error) {
    callback(error);
  }
}
