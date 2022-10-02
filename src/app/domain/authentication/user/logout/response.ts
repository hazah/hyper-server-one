import Result, { Either } from "@core/result";

import AppError from "@core/app_error";
import Errors from "@authentication/user/logout/errors";

type Response = Either<
  Errors.UserNotFoundOrDeleted | AppError.UnexpectedError,
  Result<void>
>;

export default Response;
