import { Route as ReactRoute } from "react-router-dom";
import Route from "./route";

type Builder = (methods: any) => void;
type Verb = { path: string, method: string };

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

  // generate client (currently reactjs) application
  public get router() {
    this.children.forEach(child => child.parent);

    return this.routes.map((route: Route) => {
      const Component = route.component;
      return <ReactRoute key={route.path} path={route.path} element={<Component/>}/>
    });
  }

  private root(name: string, verb: Verb) {
    const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
    const component = require(`@app/screens/${componentName}`).default;
    const { path } = verb;
    const route = new Route(name, { mappings: [
      `/${path}`, component,
    ]});
    this.routes.push(route);
  }

  private resource(name: string, options: { only: Verb | Verb[] }, builder?: Builder) {
    const { only } = options;

    [].concat(only).forEach(verb => {
      const { path, method } = verb;
      if (method === "get") {
        const componentName = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        const component = require(`@app/screens/${componentName}`).default;
        const key = `/${name}${path}`;
        const route = new Route(key, {
          mappings: [
            key, component
          ]
        });
        this.routes.push(route);
      }
    });

    if (builder) {
    //   const router = new Router(builder, route);

    //   this.children.push(router);
    }

    
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
      display: display,
      fresh: fresh,
      make: make,
      erase: erase,
    };
  }

  private get display() {
    return { path: '', method: 'get' };
  }

  private get fresh() {
    return { path: '/new', method: 'get' };
  }

  private get make() {
    return { path: '/new', method: 'post' };
  }

  private get erase() {
    return { path: '', method: 'delete' };
  }
}

export default function routes(builder: (methods: any) => void) {
  return new Router(builder).router;
}
