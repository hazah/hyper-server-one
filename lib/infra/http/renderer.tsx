import React, { Component as ReactComponent } from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

function wrap(Component: ReactComponent): ReactComponent {
  return Component;
}

export default async function jsxEngine(path: string, options: any, callback: (e: any, rendered?: string) => void): Promise<void> {
  try {
    const Component = require(`@app/${path.substring(0, path.length - 4).split("/app/")[1]}`).default;
    const isStatic = !!options.static;
    const isApp = !!options.app;
    
    delete options.static;
    delete options.app;

    const PreparedComponent = isApp ? wrap(Component) : Component;

    callback(
      null,
      isStatic  ? renderToStaticMarkup(<PreparedComponent {...options}/>) 
                : renderToString(<PreparedComponent {...options}/>)
    );
  } catch (error) {
    callback(error);
  }
}
