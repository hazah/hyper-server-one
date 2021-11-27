import express, { Router, Request, Response } from "express";

const router = Router();

function delete_(req: Request, res: Response) {
  res.end(req.url);
}

router.route('/eject')
  .delete(delete_);

const index = express()
  .use(router);

export default index;
