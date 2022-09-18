import Result, { left, right } from "@core/result";
import AppError from "@core/app_error";
import UseCase from "@core/use_case";

import DTO from "@app/domain/user/login/dto";
import Errors from "@app/domain/user/login/errors";
import ResponseDTO from "@app/domain/user/login/response/dto";
import Response from "@app/domain/user/login/response";

import Repository from "@app/domain/user/repository";

import Password from "@app/domain/user/password";
import Name from "@app/domain/user/name";
import User from "@app/domain/user";

export class LoginUserUseCase implements UseCase<DTO, Promise<Response>> {
  private userRepo: Repository;
  // private authService: IAuthService;

  constructor(userRepo: Repository, authService: any /*IAuthService*/) {
    this.userRepo = userRepo;
    // this.authService = authService
  }

  public async execute(request: DTO): Promise<Response> {
    let user: User;
    let userName: Name;
    let password: Password;

    try {
      const usernameOrError = Name.create({ name: request.username });
      const passwordOrError = Password.create({ value: request.password });
      const payloadResult = Result.combine([usernameOrError, passwordOrError]);

      if (payloadResult.isFailure) {
        return left(Result.fail<any>(payloadResult.getErrorValue()));
      }

      userName = usernameOrError.getValue();
      password = passwordOrError.getValue();

      user = await this.userRepo.getByName(userName);
      const userFound = !!user;

      if (!userFound) {
        return left(new Errors.UserNameDoesntExist());
      }

      const passwordValid = await user.password.compare(password.value);

      if (!passwordValid) {
        return left(new Errors.PasswordDoesntMatch());
      }

      // const accessToken: JWTToken = this.authService.signJWT({
      //   username: user.username.value,
      //   email: user.email.value,
      //   isEmailVerified: user.isEmailVerified,
      //   userId: user.userId.id.toString(),
      //   adminUser: user.isAdminUser,
      // });

      // const refreshToken: RefreshToken = this.authService.createRefreshToken();

      // user.setAccessToken(accessToken, refreshToken);

      // await this.authService.saveAuthenticatedUser(user);

      return right(
        Result.ok<ResponseDTO>({
          // accessToken,
          // refreshToken,
        })
      );
    } catch (err) {
      return left(new AppError.UnexpectedError(err.toString()));
    }
  }
}
