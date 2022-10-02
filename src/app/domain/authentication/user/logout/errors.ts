import UseCaseError from "@core/use_case_error";
import Result from "@core/result";

namespace Errors {
  export class UserNotFoundOrDeleted extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found or doesn't exist anymore.`,
      } as UseCaseError);
    }
  }
}

export default Errors;
