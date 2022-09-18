interface ValueObjectProps {
  [index: string]: any;
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export default abstract class ValueObject<T extends ValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    let baseProps: any = {
      ...props,
    };

    this.props = baseProps;
  }

  public equals(value?: ValueObject<T>): boolean {
    if (value === null || value === undefined) {
      return false;
    }
    if (value.props === undefined) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(value.props);
  }
}
