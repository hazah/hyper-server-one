import Result, { Either } from "@core/result";

import AppError from "@core/app_error";
import Errors from "@authentication/user/delete/errors";

type Response = Either<
  AppError.UnexpectedError | Errors.UserNotFoundError,
  Result<void>
>;

export default Response;
