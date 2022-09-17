import { NextFunction, Request, Response } from "express";
import Controller from "./controller";

export default class EjectionController extends Controller {
  public get middleware() {
    return [
      (req: Request, res: Response, next: NextFunction) => {
        req.logout();
        next();
      },
      super.middleware,
    ];
  }
}
