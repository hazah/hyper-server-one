import { NextFunction, Request, Response } from "express";

import Route from "./route";

export default class UnauthenticatedRoute extends Route {
  public constructor() {
    super("", {
      mappings: {},
    });
  }

  protected middleware() {
    return [this.ensureUnauthenticated()];
  }

  private ensureUnauthenticated() {
    return (req: Request, res: Response, next: NextFunction) => {
      if (req.isAuthenticated && req.isAuthenticated()) {
        next("router");
      } else {
        next();
      }
    };
  }
}
