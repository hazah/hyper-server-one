import Result, { Either } from "@core/result";
import AppError from "@core/app_error";
import Errors from "@app/domain/user/delete/errors";

type Response = Either<
  AppError.UnexpectedError | Errors.UserNotFoundError,
  Result<void>
>;

export default Response;
