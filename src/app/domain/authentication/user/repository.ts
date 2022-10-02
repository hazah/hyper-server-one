import UniqueEntityID from "@domain/unique_entity_id";
import User from "@authentication/user";
import Email from "@authentication/user/email";
import Name from "@authentication/user/name";

export default interface Repository {
  exists(email: Email | string): Promise<boolean>;
  getById(id: UniqueEntityID | string): Promise<User>;
  getByName(name: Name | string): Promise<User>;
  save(user: User): Promise<void>;
}
