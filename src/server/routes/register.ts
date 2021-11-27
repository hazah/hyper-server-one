import express, { Router, Request, Response } from "express";

import renderer from "renderer";

const router = Router();

function get(req: Request, res: Response, next) {
  res.format({
    html: () => {
      const { url } = req;
      res.render('Register', { url }, (error, html) => {
        if (error) {
          next(error);
        } else {
          res.render('Layout', { html, static: true });
        }
      });
    }
  });
}

function post(req: Request, res: Response) {
  res.end(req.url);
}

router
  .get('/register', get)
  .post('/register', post);

const index = express()
  .engine("tsx", renderer)
  .set("views", "src/app/screens")
  .set("view engine", "tsx")
  .use(router);

export default index;
