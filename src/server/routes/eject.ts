import { Request, Response } from "express";

export function erase(req: Request, res: Response) {
  res.end(req.url);
}
