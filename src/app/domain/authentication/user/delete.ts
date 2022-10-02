import Result, { left, right } from "@core/result";
import AppError from "@core/app_error";
import UseCase from "@core/use_case";

import DTO from "@authentication/user/delete/dto";
import Errors from "@authentication/user/delete/errors";
import Response from "@authentication/user/delete/response";

import Repository from "@authentication/user/repository";

export class Delete implements UseCase<DTO, Promise<Response>> {
  private repository: Repository;

  public constructor(repository: Repository) {
    this.repository = repository;
  }

  public async execute(request: DTO): Promise<Response> {
    try {
      const user = await this.repository.getById(request.userId);
      const userFound = !!user === true;

      if (!userFound) {
        return left(new Errors.UserNotFoundError());
      }

      user.delete();

      await this.repository.save(user);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
