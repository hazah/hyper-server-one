// these are here temporarily
import express from "express";

import Route from "./route";

type Builder = (methods: any) => void;
type Verb = (module: any) => any;

class Router {
  private routes: Route[] = [];
  private children: Router[] = [];
  
  public constructor(builder: Builder, private parent?: Route) {
    const { root, resource, authenticated, unauthenticated, verbs } = this
    builder({
      root: root.bind(this),
      resource: resource.bind(this),
      authenticated: authenticated.bind(this),
      unauthenticated: unauthenticated.bind(this),
      verbs: verbs,
    });
  }

  // generate server (currently expressjs) application
  public get server() {
    this.children.forEach(child => child.parent.path.all(child.server));

    const app = express();

    this.routes.forEach(route => app.use(route.route));

    return app;
  }

  private root(name: string, verb: Verb) {
    const module = require(`@server/routes/${name}`);
    const { handler, path } = verb(module);
    const route = new Route(name, { mappings: {
      [`/${path}`]: {
        'get': handler,
      },
    }});
    this.routes.push(route);
  }

  private resource(name: string, options: { only: Verb | Verb[] }, builder?: Builder) {
    const module = require(`@server/routes/${name}`);
    const { only } = options;

    const route = new Route(name, {
      mappings: [].concat(only).reduce((map, verb) => {
        const { handler, path, method } = verb(module);
        const key = `/${name}${path}`;

        if (map[key] === undefined) {
          map[key] = {};
        }

        map[key][method] = handler;
        
        return map;
      }, {})
    });

    if (builder) {
      const router = new Router(builder, route);

      this.children.push(router);
    }

    this.routes.push(route);
  }

  private unauthenticated(builder: Builder) {
    const { root, resource, verbs } = this
    builder({
      root: root.bind(this),
      resource: resource.bind(this),
      verbs: verbs,
    });
  }

  private authenticated(builder: Builder) {
    const { root, resource, verbs } = this
    builder({
      root: root.bind(this),
      resource: resource.bind(this),
      verbs: verbs,
    });
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
    return { handler: display, path: '', method: 'get' };
  }

  private fresh({ fresh }) {
    return { handler: fresh, path: '/new', method: 'get' };
  }

  private make({ make }) {
    return { handler: make, path: '', method: 'post' };
  }

  private erase({ erase }) {
    return { handler: erase, path: '', method: 'delete' };
  }
}

export default function routes(builder: (methods: any) => void) {
  return new Router(builder).server;
}
