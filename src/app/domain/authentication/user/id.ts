import UniqueEntityID from "@domain/unique_entity_id";
import Result from "@core/result";
import Entity from "@domain/entity";

export default class Id extends Entity<any> {
  get id(): UniqueEntityID {
    return this._id;
  }

  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }

  public static create(id?: UniqueEntityID): Result<Id> {
    return Result.ok<Id>(new Id(id));
  }
}
