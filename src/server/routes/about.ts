import { Request, Response } from "express";

export function display(req: Request, res: Response, next) {
  res.format({
    html: () => {
      const { url } = req;
      res.render('About', { url, static: process.env.MODE === "server-only", app: true }, (error, html) => {
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
