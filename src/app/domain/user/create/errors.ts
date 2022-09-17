import UseCaseError from "@core/use_case_error";
import Result from "@core/result";

namespace Errors {
  export class EmailAlreadyExists extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `The email ${email} associated for this account already exists`,
      } as UseCaseError);
    }
  }

  export class UsernameTaken extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `The username ${username} was already taken`,
      } as UseCaseError);
    }
  }
}

export default Errors;
