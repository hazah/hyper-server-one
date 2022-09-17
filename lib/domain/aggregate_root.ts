import Entity, { Constructor } from "./entity";

type AggregateRoot = Entity & {
  events: any[];
}

const AggregateRoot =
  () =>
  <T extends Constructor>(constructor: T) => {
    const { prototype } = constructor;

    return class {
      constructor(...args: any[]) {
        const [properties = {}] = args;
        

        
        return new constructor(...args);
      }
    };
  };

export default AggregateRoot;
