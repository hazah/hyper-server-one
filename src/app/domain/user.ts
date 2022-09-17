import Entity from "@domain/entity";
import UniqueEntityID from "@domain/unique_entity_id";

const generateNewId = () => new UniqueEntityID("the uuid");

@Entity(generateNewId)
export default class User {
  constructor(..._: any[]) {
    const { id } = this as unknown as UserEntity;
  }
}

export type UserEntity = User & Entity;
