import Result, { Either } from "@core/result";

import AppError from "@core/app_error";
import Errors from "@authentication/user/login/errors";

import DTO from "@authentication/user/login/response/dto";

type Response = Either<
  | Errors.PasswordDoesntMatch
  | Errors.UserNameDoesntExist
  | AppError.UnexpectedError,
  Result<DTO>
>;

export default Response;
