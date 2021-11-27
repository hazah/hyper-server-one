import fs from "fs";
import React from "react";
import { renderToStaticMarkup, renderToString } from "react-dom/server";

export default async function jsxEngine(path: string, options: any, callback: (e: any, rendered?: string) => void): Promise<void> {
  try {
    const Component = require(`@app/${path.substring(0, path.length - 4).split("/app/")[1]}`).default;
    const isStatic = !!options.static;

    callback(
      null,
      isStatic  ? renderToStaticMarkup(<Component {...options}/>) 
                : renderToString(<Component {...options}/>)
    );
  } catch (error) {
    callback(error);
  }
}
