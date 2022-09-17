import express, { Express, Router } from "express";

import renderer from "./renderer";

export default class Route {
  private _router: Router;
  private _route: Express;

  public constructor(private _name: string, private config: any = {}) {}

  public get router() {
    if (!this._router) {
      const router = Router();

      const { mappings } = this.config;

      Object.keys(mappings).forEach((path) => {
        const mapping = mappings[path];
        const route = router.route(path);

        Object.keys(mapping).forEach((verb) => {
          route[verb](mapping[verb]);
        });
      });
      this._router = router;
    }
    return this._router;
  }

  public get route() {
    if (!this._route) {
      this._route = express()
        .disable("x-powered-by")
        .engine("tsx", renderer)
        .set("views", "src/app/screens")
        .set("view engine", "tsx")
        .use(...this.middleware(), this.router);
    }

    return this._route;
  }

  protected middleware() {
    return []
  }
}
