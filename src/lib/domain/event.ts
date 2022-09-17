import UniqueEntityID from "@domain/unique_entity_id";

export default interface IDomainEvent {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
}
