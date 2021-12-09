import { Request, Response, NextFunction } from "express";
import passport from "passport";
import Controller from "./controller";

export default class AuthenticationController extends Controller {
  public get middleware() {
    return [
      (req: Request, res: Response, next: NextFunction) => {
        const authenticator = passport.authenticate(
          "local",
          (err, user, info) => {
            
            req.logIn(user, (err) => {
              if (err) {
                return next(err);
              }
              next();
            });
          }
        );

        authenticator(req, res, next);
      },
      super.middleware,
    ];
  }
}
