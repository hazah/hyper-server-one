import Result, { Either } from "@core/result";

import AppError from "@core/app_error";
import Errors from "@authentication/user/create/errors";

type Response = Either<
  | Errors.EmailAlreadyExists
  | Errors.UsernameTaken
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export default Response;
