import Event from "@domain/event";
import UniqueEntityID from "@domain/unique_entity_id";

import User from "@authentication/user";

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
