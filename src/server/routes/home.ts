import express, { Router, Request, Response } from "express";

import renderer from "renderer";

function display(req: Request, res: Response, next) {
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

const router = Router()

router.route('/')
  .get(display);

const home = express()
  .engine("tsx", renderer)
  .set("views", "src/app/screens")
  .set("view engine", "tsx")
  .use(router);

export default home;
