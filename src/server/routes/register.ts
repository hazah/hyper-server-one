import express, { Router, Request, Response } from "express";

const router = Router();

function get(req: Request, res: Response) {
  res.end(req.url);
}

function post(req: Request, res: Response) {
  res.end(req.url);
}

router
  .get('/register', get)
  .post('/register', post);

const index = express()
  .use(router);

export default index;
