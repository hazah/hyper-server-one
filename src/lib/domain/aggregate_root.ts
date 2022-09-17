
import Entity from "@domain/entity";
import Event from "@domain/event";
import Events from "@domain/events";
import UniqueEntityID from "@domain/unique_entity_id";

export default abstract class AggregateRoot<T> extends Entity<T> {
  private _events: Event[] = [];

  get id (): UniqueEntityID {
    return this._id;
  }

  get events(): Event[] {
    return this._events;
  }

  protected addEvent (event: Event): void {
    // Add the domain event to this aggregate's list of domain events
    this._events.push(event);
    // Add this aggregate instance to the domain event's list of aggregates who's
    // events it eventually needs to dispatch.
    Events.markAggregateForDispatch(this);
    // Log the domain event
    this.logEventAdded(event);
  }

  public clearEvents (): void {
    this._events.splice(0, this._events.length);
  }

  private logEventAdded (event: Event): void {
    const thisClass = Reflect.getPrototypeOf(this);
    const eventClass = Reflect.getPrototypeOf(event);
    console.info(`[ Event Created]:`, thisClass.constructor.name, '==>', eventClass.constructor.name)
  }
}