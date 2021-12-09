// these are here temporarily
import express from "express";

import Route from "./route";
import Controller from "./controller";
import UnauthenticatedRoute from "./unauthenticated_route";
import AuthenticatedRoute from "./authenticated_route";

type Builder = (methods: any) => void;
type Verb = (module: any) => any;

export class Router {
  private routes: Route[] = [];
  private children: Router[] = [];

  public constructor(builder: Builder, private parent?: Route) {
    const { root, resource, authenticated, unauthenticated, verbs } = this;
    builder({
      root: root.bind(this),
      resource: resource.bind(this),
      authenticated: authenticated.bind(this),
      unauthenticated: unauthenticated.bind(this),
      verbs: verbs,
    });
  }

  // generate router (currently expressjs) application
  public get router() {
    const app = express().disable("x-powered-by");
    
    this.children.forEach((child) =>{
      child.parent.route.use(child.routes.map((route) => route.route));
    });

    this.routes.forEach((route) => app.use(route.route));

    return app;
  }

  private root(name: string, verb: Verb) {
    const module = require(`@server/controllers/${name}`);
    const { handler, path } = verb(module);
    const controller = new Controller(handler);
    const route = new Route(name, {
      mappings: {
        [`/${path}`]: {
          get: controller.middleware,
        },
      },
    });
    this.routes.push(route);
  }

  private resource(
    name: string,
    options: { only: Verb | Verb[] },
    builder?: Builder
  ) {
    const module = require(`@server/controllers/${name}`);
    const { only } = options;

    const route = new Route(name, {
      mappings: [].concat(only).reduce((map, verb) => {
        const { handler, path, method } = verb(module);
        const controller = new Controller(handler);
        const key = `/${name}${path}`;

        if (map[key] === undefined) {
          map[key] = {};
        }

        map[key][method] = controller.middleware;

        return map;
      }, {}),
    });

    if (builder) {
      const router = new Router(builder, route);

      this.children.push(router);
    }

    this.routes.push(route);
  }

  private unauthenticated(builder: Builder) {
    const route = new UnauthenticatedRoute();
    this.children.push(new Router(builder, route));
    this.routes.push(route);
  }

  private authenticated(builder: Builder) {
    const route = new AuthenticatedRoute();
    this.children.push(new Router(builder, route));
    this.routes.push(route);
  }

  private get verbs() {
    const { display, fresh, make, erase } = this;
    return {
      display: display.bind(this),
      fresh: fresh.bind(this),
      make: make.bind(this),
      erase: erase.bind(this),
    };
  }

  private display({ display }) {
    return { handler: display, path: "", method: "get" };
  }

  private fresh({ fresh }) {
    return { handler: fresh, path: "", method: "get" };
  }

  private make({ make }) {
    return { handler: make, path: "", method: "post" };
  }

  private erase({ erase }) {
    return { handler: erase, path: "", method: "delete" };
  }
}

export default function routes(builder: Builder) {
  return new Router(builder).router;
}
