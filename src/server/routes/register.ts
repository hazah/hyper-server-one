import { Request, Response } from "express";


export function fresh({ format, render }) {
  format({
    html: render
  });
}

export function make(req: Request, res: Response) {
  res.end(req.url);
}
