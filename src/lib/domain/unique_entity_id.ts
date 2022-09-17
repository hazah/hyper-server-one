import Identifier from "./identifier";

export default class UniqueEntityID extends Identifier<string | number> {
  constructor (id?: string | number) {
    super(id ? id : "uuid()")
  }
}
