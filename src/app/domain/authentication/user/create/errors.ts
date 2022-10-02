import Result from "@core/result";

import UseCaseError from "@core/use_case_error";

namespace Errors {
  export class EmailAlreadyExists extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`,
      });
    }
  }

  export class UsernameTaken extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `The username ${username} was already taken`,
      });
    }
  }
}

export default Errors;
