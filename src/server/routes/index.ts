import express, { Router, Request, Response } from "express";

import renderer from "renderer";

function get(req: Request, res: Response, next) {
  res.format({
    html: () => {
      const { url } = req;
      res.render('Home', { url, static: process.env.MODE === "server-only" }, (error, html) => {
        if (error) {
          next(error);
        } else {
          res.render('Application', { html, static: true });
        }
      });
    }
  });
}

const router = Router()

const route = router.route('/')
  .get(get);

const index = express()
  .engine("tsx", renderer)
  .set("views", "src/app/screens")
  .set("view engine", "tsx")
  .use(router);

export default index;
