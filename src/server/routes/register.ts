import express, { Router, Request, Response } from "express";

import renderer from "renderer";

const router = Router();

function fresh(req: Request, res: Response, next) {
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

function make(req: Request, res: Response) {
  res.end(req.url);
}

router.route('/register')
  .get(fresh)
  .post(make);

const index = express()
  .engine("tsx", renderer)
  .set("views", "src/app/screens")
  .set("view engine", "tsx")
  .use(router);

export default index;
