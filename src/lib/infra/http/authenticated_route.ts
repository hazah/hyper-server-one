import { NextFunction, Request, Response } from "express";

import Route from "./route";

export default class AuthenticatedRoute extends Route {
  public constructor() {
    super("", {
      mappings: {},
    });
  }

  protected middleware() {
    return [this.ensureAuthenticated()];
  }

  private ensureAuthenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!req.isAuthenticated || !req.isAuthenticated()) {
        next("router");
      } else {
        next();
      }
    };
  }
}
