import Result, { left, right } from "@core/result";
import AppError from "@core/app_error";
import UseCase from "@core/use_case";

import DTO from "@app/domain/user/create/dto";
import Errors from "@app/domain/user/create/errors";
import Response from "@app/domain/user/create/response";

import Repository from "@app/domain/user/repository";

import Email from "@app/domain/user/email";
import Password from "@app/domain/user/password";
import Name from "@app/domain/user/name";
import User from "@app/domain/user";

export class Create implements UseCase<DTO, Promise<Response>> {
  private repository: Repository;

  public constructor(repository: Repository) {
    this.repository = repository;
  }

  public async execute(request: DTO): Promise<Response> {
    const emailOrError = Email.create(request.email);
    const passwordOrError = Password.create({ value: request.password });
    const usernameOrError = Name.create({ name: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue()));
    }

    const email: Email = emailOrError.getValue();
    const password: Password = passwordOrError.getValue();
    const username: Name = usernameOrError.getValue();

    try {
      const userAlreadyExists = await this.repository.exists(email);

      if (userAlreadyExists) {
        return left(new Errors.EmailAlreadyExists(email.value));
      }

      try {
        const alreadyCreatedUserByName = await this.repository.getByName(username);

        const userNameTaken = !!alreadyCreatedUserByName === true;

        if (userNameTaken) {
          return left(new Errors.UsernameTaken(username.value));
        }
      } catch (err) {}

      const userOrError: Result<User> = User.create({
        email,
        password,
        username,
      });

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getErrorValue().toString())
        );
      }

      const user: User = userOrError.getValue();

      await this.repository.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
