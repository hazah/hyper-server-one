import Controller from "./controller";

export default abstract class JsonController extends Controller {
  private json(code: number, message: string) {
    this.res.status(code).json({ message })
  }

  protected ok<T> (dto?: T) {
    if (!!dto) {
      this.res.type("application/json");
      this.res.status(200).json(dto);
    }
  }

  protected created() {
    this.res.sendStatus(201);
  }

  protected clientError(message?: string) {
    this.json(400, message ? message : "Unauthorized");
  }

  protected unauthorized(message?: string) {
    this.json(401, message ? message : "Unauthorized");
  }

  protected paymentRequired(message?: string) {
    this.json(402, message ? message : "Payment required");
  }

  protected forbidden(message?: string) {
    this.json(403, message ? message : "Forbidden");
  }

  protected notFound(message?: string) {
    this.json(404, message ? message : "Not found");
  }

  protected conflict(message?: string) {
    this.json(409, message ? message : "Conflict");
  }

  protected tooMany(message?: string) {
    this.json(429, message ? message : "Too many requests");
  }

  protected todo() {
    this.json(400, "TODO");
  }

  protected fail(error: Error | string) {
    console.error(error);
    this.json(500, error.toString());
  }
}
