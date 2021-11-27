import express, { Router, Request, Response } from "express";

const router = Router();

function delete_(req: Request, res: Response) {
  res.end(req.url);
}

router
  .delete('/logout', delete_);

const index = express()
  .use(router);

export default index;
