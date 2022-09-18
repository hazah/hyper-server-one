import Result from "@core/result";

import UseCaseError from "@core/use_case_error";

namespace Errors {
  export class UserNotFoundError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `User not found`,
      } as UseCaseError);
    }
  }
}

export default Errors;
