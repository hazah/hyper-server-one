import AggregateRoot from "@domain/aggregate_root";
import Guard from "@core/guard";
import Result from "@core/result";
import UniqueEntityID from "@domain/unique_entity_id";

import Id from "@authentication/user/id";
import Email from "@authentication/user/email";
import Name from "@authentication/user/name";
import Password from "@authentication/user/password";
import Created from "@authentication/user/created";
import Deleted from "@authentication/user/deleted";

interface Props {
  email: Email;
  username: Name;
  password: Password;
  isDeleted?: boolean;
}

export default class User extends AggregateRoot<Props> {
  public get userId(): Id {
    return Id.create(this._id).getValue();
  }

  public get email(): Email {
    return this.props.email;
  }

  public get username(): Name {
    return this.props.username;
  }

  public get password(): Password {
    return this.props.password;
  }

  private constructor(props: Props, id?: UniqueEntityID) {
    super(props, id);
  }

  public delete(): void {
    if (!this.props.isDeleted) {
      this.addEvent(new Deleted(this));
      this.props.isDeleted = true;
    }
  }

  public static create(props: Props, id?: UniqueEntityID): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: "username" },
      { argument: props.email, argumentName: "email" },
    ]);

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getErrorValue());
    }

    const isNewUser = !!id === false;
    const user = new User(
      {
        ...props,
      },
      id
    );

    if (isNewUser) {
      user.addEvent(new Created(user));
    }

    return Result.ok<User>(user);
  }
}
