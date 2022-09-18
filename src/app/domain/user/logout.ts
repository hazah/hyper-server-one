import Result, { left, right } from "@core/result";
import AppError from "@core/app_error";
import UseCase from "@core/use_case";

import DTO from "@app/domain/user/logout/dto";
import Errors from "@app/domain/user/logout/errors";
import Response from "@app/domain/user/logout/response";

import Repository from "@app/domain/user/repository";
import User from "@app/domain/user";

export class LogoutUseCase implements UseCase<DTO, Promise<Response>> {
  private userRepo: Repository;
  // private authService: IAuthService;

  constructor(userRepo: Repository /*, authService: IAuthService*/) {
    this.userRepo = userRepo;
    // this.authService = authService;
  }

  public async execute(request: DTO): Promise<Response> {
    let user: User;
    const { id } = request;

    try {
      try {
        user = await this.userRepo.getById(id);
      } catch (err) {
        return left(new Errors.UserNotFoundOrDeleted());
      }

      // await this.authService.deAuthenticateUser(user.username.value);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
