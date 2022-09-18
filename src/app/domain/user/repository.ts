import User from "@app/domain/user";
import Email from "@app/domain/user/email";
import Name from "@app/domain/user/name";

export default interface Repository {
  exists(email: Email): Promise<boolean>;
  getById(id: string): Promise<User>;
  getByName(name: Name | string): Promise<User>;
  save(user: User): Promise<void>;
}
