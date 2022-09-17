import Errors from "@app/domain/user/create/errors";
import Result, { Either, left, right } from "@core/result";
import AppError from "@core/app_error";

type Response = Either<
  | Errors.EmailAlreadyExists
  | Errors.UsernameTaken
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export default Response;
