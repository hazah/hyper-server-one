import Result, { Either } from "@core/result";

import AppError from "@core/app_error";
import Errors from "@app/domain/user/logout/errors";

type Response = Either<
  Errors.UserNotFoundOrDeleted | AppError.UnexpectedError,
  Result<void>
>;

export default Response;
