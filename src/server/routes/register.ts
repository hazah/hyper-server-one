import { Request, Response } from "express";


export function fresh({ format, render }) {
  format({
    html: render
  });
}

export function make({ end, url }) {
  end(url);
}
