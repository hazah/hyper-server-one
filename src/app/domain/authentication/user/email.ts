import Result from "@core/result";
import ValueObject from "@domain/value_object";

interface Props {
  value: string;
}

export default class Email extends ValueObject<Props> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: Props) {
    super(props);
  }

  private static isValidEmail(email: string) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<Email> {
    if (!this.isValidEmail(email)) {
      return Result.fail<Email>("Email address not valid");
    } else {
      return Result.ok<Email>(new Email({ value: this.format(email) }));
    }
  }
}
