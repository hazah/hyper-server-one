import Route from "./route";

export default class Router {
  public constructor(private routes: Route[]) {

  }

  // generate server (currently expressjs) application
  public get server() {
    return null;
  }

  // generate server (currently reactjs) application
  public get client() {
    return null;
  }
}
