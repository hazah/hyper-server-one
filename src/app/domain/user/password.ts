// import * as bcrypt from "bcrypt-nodejs";
import ValueObject from "@domain/value_object";
import Guard from "@core/guard";
import Result from "@core/result";

interface Properties {
  value: string;
  hashed?: boolean;
}

export default class Password extends ValueObject<Properties> {
  public static minLength: number = 6;

  public get value(): string {
    return this.props.value;
  }

  private constructor(props: Properties) {
    super(props);
  }

  private static isAppropriateLength(password: string): boolean {
    return password.length >= this.minLength;
  }

  /**
   * @method compare
   * @desc Compares as plain-text and hashed password.
   */

  public async compare(plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // bcrypt.compare(plainText, hashed, (err, compareResult) => {
      //   if (err) return resolve(false);
      //   return resolve(compareResult);
      // });
    });
  }

  public isAlreadyHashed(): boolean {
    return this.props.hashed;
  }

  private hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      // bcrypt.hash(password, null, null, (err, hash) => {
      //   if (err) return reject(err);
      //   resolve(hash);
      // });
    });
  }

  public getHashedValue(): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value));
      }
    });
  }

  public static create(props: Properties): Result<Password> {
    const propsResult = Guard.againstNullOrUndefined(props.value, "password");

    if (propsResult.isFailure) {
      return Result.fail<Password>(propsResult.getErrorValue());
    } else {
      if (!props.hashed) {
        if (!this.isAppropriateLength(props.value)) {
          return Result.fail<Password>(
            "Password doesnt meet criteria [8 chars min]."
          );
        }
      }

      return Result.ok<Password>(
        new Password({
          value: props.value,
          hashed: !!props.hashed === true,
        })
      );
    }
  }
}
