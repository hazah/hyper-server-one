import express from "express";
import methodOverride from "method-override";
import routes from "router";

const app = express()
  // .engine("tsx", ApplicationController.engine())
  // .set("views", "src/app")
  // .set("view engine", "tsx")
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(express.urlencoded({ extended: true }))
  .use(methodOverride(function (req) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method
      delete req.body._method
      return method
    }
  }))
  .use(...routes);
  // .get("/*", Controller.create(ApplicationController));

export default app;
