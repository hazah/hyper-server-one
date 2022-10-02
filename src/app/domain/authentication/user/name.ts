
import Result from "@core/result";
import ValueObject from "@domain/value_object";
import Guard from "@core/guard";

interface Props {
  name: string;
}

export default class Name extends ValueObject<Props> {
  public static maxLength: number = 15;
  public static minLength: number = 2;

  get value (): string {
    return this.props.name;
  }

  private constructor (props: Props) {
    super(props);
  }

  public static create(props: Props): Result<Name> {
    const usernameResult = Guard.againstNullOrUndefined(props.name, 'username');
    if (usernameResult.isFailure) {
      return Result.fail<Name>(usernameResult.getErrorValue())
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (minLengthResult.isFailure) {
      return Result.fail<Name>(minLengthResult.getErrorValue())
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (maxLengthResult.isFailure) {
      return Result.fail<Name>(minLengthResult.getErrorValue())
    }

    return Result.ok<Name>(new Name(props));
  }
}