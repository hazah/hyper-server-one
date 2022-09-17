import DTO from "@app/domain/user/create/dto";
import Errors from "@app/domain/user/create/errors";
import Result, { Either, left, right } from "@core/result";
import AppError from "@core/app_error";
// import IUserRepo from "../../repos/userRepo";
import UseCase from "@core/use_case";
import Email from "@app/domain/user/email";
import Password from "@app/domain/user/password";
import Name from "@app/domain/user/name";
import User from "@app/domain/user";
import Response from "@app/domain/user/create/response";

export class Create implements UseCase<DTO, Promise<Response>> {
  // private userRepo: IUserRepo;

  // constructor(userRepo: IUserRepo) {
  //   this.userRepo = userRepo;
  // }

  async execute(request: DTO): Promise<Response> {
    const emailOrError = Email.create(request.email);
    const passwordOrError = Password.create({ value: request.password });
    const usernameOrError = Name.create({ name: request.username });

    const dtoResult = Result.combine([
      emailOrError,
      passwordOrError,
      usernameOrError,
    ]);

    if (dtoResult.isFailure) {
      return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
    }

    const email: Email = emailOrError.getValue();
    const password: Password = passwordOrError.getValue();
    const username: Name = usernameOrError.getValue();

    try {
      const userAlreadyExists = false; //await this.userRepo.exists(email);

      if (userAlreadyExists) {
        return left(new Errors.EmailAlreadyExists(email.value)) as Response;
      }

      try {
        const alreadyCreatedUserByName = false; //await this.userRepo.getUserByName(username);

        const userNameTaken = !!alreadyCreatedUserByName === true;

        if (userNameTaken) {
          return left(new Errors.UsernameTaken(username.value)) as Response;
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
        ) as Response;
      }

      const user: User = userOrError.getValue();

      // await this.userRepo.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err)) as Response;
    }
  }
}
