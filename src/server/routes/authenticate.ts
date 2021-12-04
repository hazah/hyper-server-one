import { Request, Response } from "express";

export function fresh(req: Request, res: Response, next) {
  res.format({
    html: () => {
      const { url } = req;
      res.render('Authenticate', { url, static: process.env.MODE === "server-only", app: true }, (error, html) => {
        if (error) {
          next(error);
        } else {
          res.render('Shell', { html, static: true }, (error, html) => {
            if (error) {
              next(error);
            } else {
              res.send(`<!DOCTYPE html>${html}`);
            }
          });
        }
      });
    }
  });
}

export function make(req: Request, res: Response) {
  res.end(req.url);
}
