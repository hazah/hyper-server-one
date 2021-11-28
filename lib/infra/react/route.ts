
export default class Route {
  public constructor(private name: string, private config: any = {}) {}
  
  public get path() {
    const { mappings: [ path ] } = this.config;

    return path;
  }

  public get component() {
    const { mappings: [ _, component ]} = this.config;

    return component;
  }
}
