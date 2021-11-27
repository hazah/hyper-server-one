import express, { Express, Router } from "express";
import { IRoute } from "express-serve-static-core";

import renderer from "renderer";

export default class Route {
  private _router: Router;
  private _route: Express;
  private _path: IRoute<string>;

  public constructor(private name: string, private config: any = {}) {
    const router = Router();

    const { mappings } = this.config;
    
    Object.keys(mappings).forEach(path => {
      const mapping = mappings[path];
      const route = router.route(path);
      
      Object.keys(mapping).forEach(verb => {
        route[verb].call(route, mapping[verb]);
      });

      if (path.substring(1) === name) {
        this._path = route;
      }
    });
    this._router = router;
  }

  public get router() {
    return this._router;
  }

  public get path() {
    this.router;
    return this._path;
  }

  public get route() {
    if (!this._route) {
      this._route = express()
        .engine("tsx", renderer)
        .set("views", "src/app/screens")
        .set("view engine", "tsx")
        .use(this.router);
    }

    return this._route;
  }
}
