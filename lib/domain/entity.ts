import UniqueEntityID from './unique_entity_id';

export type Constructor = { new (...args: any[]): any };

type Entity = {
  readonly id?: UniqueEntityID;
  equals(object?: Entity): boolean;
};

const equals = (prototype: { id: UniqueEntityID }) => (object?: Entity): boolean => {
  if (object == null || object == undefined) {
    return false;
  }

  return prototype.id.equals(object.id);
};

const Entity =
  (generateNewId: () => UniqueEntityID) =>
  <T extends Constructor>(constructor: T) => {
    const { prototype } = constructor;

    return class {
      constructor(...args: any[]) {
        const [properties = {}] = args;
        const { id = undefined } = properties;

        prototype.id = id ?? generateNewId();
        prototype.equals = equals(prototype);

        return new constructor(...args);
      }
    };
  };

export default Entity;
