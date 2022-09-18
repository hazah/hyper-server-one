import User from "@app/domain/user";
import Event from "@domain/event";
import UniqueEntityID from "@domain/unique_entity_id";

export default class Deleted implements Event {
  public dateTimeOccurred: Date;
  public user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
