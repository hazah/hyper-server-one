import { Request, Response } from "express";

export function display(req: Request, res: Response, next) {
  res.format({
    html: () => {
      const { url } = req;
      res.render('Home', { url, static: process.env.MODE === "server-only" }, (error, html) => {
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
