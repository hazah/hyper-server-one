import express, { Router, Request, Response } from "express";

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.end(req.url);
});

const index = express()
  .use(router);

export default index;
