import express from "express";
import morgan from "morgan";
import helmet from "helmet";

let app = require("@server/app").default;

if (module.hot) {
  module.hot.accept("server/app", () => {
    console.log("🔁  HMR Reloading `./app`...");
    try {
      app = require("@server/app").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .disable("x-powered-by")
  .use(morgan("combined"))
  .use((req, res) => app.handle(req, res))
  .use(helmet())
  .listen(port, () => {
    console.log(`> App started http://localhost:${port}`);
  });
