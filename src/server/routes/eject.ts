import express, { Router, Request, Response } from "express";

const router = Router();

function erase(req: Request, res: Response) {
  res.end(req.url);
}

router.route('/eject')
  .delete(erase);

const index = express()
  .use(router);

export default index;
