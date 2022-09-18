import Result from "@core/result";

import UseCaseError from "@core/use_case_error";

namespace Errors {
  export class UserNameDoesntExist extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Username or password incorrect.`,
      } as UseCaseError);
    }
  }

  export class PasswordDoesntMatch extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: `Password doesnt match error.`,
      } as UseCaseError);
    }
  }
}

export default Errors;
