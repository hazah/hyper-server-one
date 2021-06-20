import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

type HandlerType = (req: Request, res: Response) => void | Promise<void>;

export default abstract class Controller {

  public static create(Constructor: any): HandlerType {
    return (req: Request, res: Response) => {
      const controller = new Constructor(req, res);

      controller.performAction();
    }
  }
  
  protected get params(): ParamsDictionary {
    return this.req.params;
  }

  protected constructor(
    protected req: Request,
    protected res: Response
  ) {
  }

  protected abstract performAction(): void | Promise<void>;

  protected abstract ok(withMarkup: boolean): void | Promise<void>;
  protected abstract ok<T> (dto?: T): void | Promise<void>;

  protected abstract created(): void | Promise<void>;

  protected abstract clientError(message?: string): void | Promise<void>;

  protected abstract unauthorized(message?: string): void | Promise<void>;

  protected abstract paymentRequired(message?: string): void | Promise<void>;

  protected abstract forbidden(message?: string): void | Promise<void>;

  protected abstract notFound(message?: string): void | Promise<void>;

  protected abstract conflict(message?: string): void | Promise<void>;

  protected abstract tooMany(message?: string): void | Promise<void>;

  protected abstract todo(): void | Promise<void>;

  protected abstract fail(error: Error | string): void | Promise<void>;
}
