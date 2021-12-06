// these are here temporarily
import express, { Request, Response } from "express";
import { Helmet } from "react-helmet";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

import Route from "./route";

type Builder = (methods: any) => void;
type Verb = (module: any) => any;

class Router {
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
    this.children.forEach((child) => child.parent.path.all(child.router));

    const app = express();

    this.routes.forEach((route) => app.use(route.route));

    return app;
  }

  private root(name: string, verb: Verb) {
    const module = require(`@server/routes/${name}`);
    const { handler, path } = verb(module);
    const route = new Route(name, {
      mappings: {
        [`/${path}`]: {
          get: this.handler(handler),
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
    const module = require(`@server/routes/${name}`);
    const { only } = options;

    const route = new Route(name, {
      mappings: [].concat(only).reduce((map, verb) => {
        const { handler, path, method } = verb(module);
        const key = `/${name}${path}`;

        if (map[key] === undefined) {
          map[key] = {};
        }

        map[key][method] = this.handler(handler);

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
    const { root, resource, verbs } = this;
    builder({
      root: root.bind(this),
      resource: resource.bind(this),
      verbs: verbs,
    });
  }

  private authenticated(builder: Builder) {
    const { root, resource, verbs } = this;
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
    return { handler: display, path: "", method: "get" };
  }

  private fresh({ fresh }) {
    return { handler: fresh, path: "/new", method: "get" };
  }

  private make({ make }) {
    return { handler: make, path: "/new", method: "post" };
  }

  private erase({ erase }) {
    return { handler: erase, path: "", method: "delete" };
  }

  private render(req: Request, res: Response, next, options: any) {
    const { url } = req;
    const key = "css";
    const cache = createCache({ key });
    const { extractCritical } = createEmotionServer(cache);

    res.render(
      "App",
      { url, static: process.env.MODE === "server-only", app: true, cache, ...options },
      (error, html) => {
        if (error) {
          next(error);
        } else {
          const helmet = Helmet.renderStatic();

          const htmlAttributes = helmet.htmlAttributes.toComponent();
          const bodyAttributes = helmet.bodyAttributes.toComponent();

          const title = helmet.title.toComponent();
          const meta = helmet.meta.toComponent();
          const link = helmet.link.toComponent();
          const script = helmet.script.toComponent();
          const style = helmet.style.toComponent();

          const { ids, css } = extractCritical(html);

          const options = {
            html,
            htmlAttributes,
            bodyAttributes,
            title,
            meta,
            link,
            script,
            style,
            ids,
            css,
            static: true,
          };

          res.render("Shell", options, (error, html) => {
            if (error) {
              next(error);
            } else {
              res.send(`<!DOCTYPE html>${html}`);
            }
          });
        }
      }
    );
  }

  private handler(
    handler: ({
      format,
      render,
      end,
      url,
    }: {
      format: any;
      render: (options: any) => void;
      end: (arg: any) => void;
      url: string;
    }) => void
  ) {
    return (req: Request, res: Response, next) => {
      const format = res.format.bind(res);
      const render = (options: any) => () => this.render(req, res, next, options);
      const end = (arg: any) => res.end(arg);
      const url = req.url;

      handler({ format, render, end, url });
    };
  }
}

export default function routes(builder: (methods: any) => void) {
  return new Router(builder).router;
}
