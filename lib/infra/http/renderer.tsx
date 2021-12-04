import React, { FunctionComponent } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

const withRouter = (Component: FunctionComponent) => {
  return ({ url, ...props }): JSX.Element => {
    return (
      <StaticRouter location={url}>
        <Component {...props}></Component>
      </StaticRouter>
    );
  }
}

export default async function jsxEngine(path: string, options: any, callback: (e: any, rendered?: string) => void): Promise<void> {
  try {
    const isStatic = !!options.static;
    const isApp = !!options.app;
    
    let Component = require(`@app/${path.substring(0, path.length - 4).split("/app/")[1]}`).default;
    
    delete options.static;
    delete options.app;

    Component = isApp ? withRouter(Component) : Component;
    
    const render = isStatic ? renderToStaticMarkup : renderToString;
    callback(
      null,
      render.call(this, <Component {...options}/>)
    );
  } catch (error) {
    callback(error);
  }
}
