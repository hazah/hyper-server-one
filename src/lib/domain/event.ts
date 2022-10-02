import UniqueEntityID from "@domain/unique_entity_id";

export default interface Event {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
