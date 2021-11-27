import { Request, Response } from "express";

export function fresh(req: Request, res: Response, next) {
  res.format({
    html: () => {
      const { url } = req;
      res.render('Register', { url, static: process.env.MODE === "server-only" }, (error, html) => {
        if (error) {
          next(error);
        } else {
          res.render('Application', { html, static: true }, (error, html) => {
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
