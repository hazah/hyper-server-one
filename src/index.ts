import express from "express";
import morgan from "morgan";

let app = require("server/frontend").default;

if (module.hot) {
  module.hot.accept("server/frontend", () => {
    console.log("🔁  HMR Reloading `./frontend`...");
    try {
      app = require("server/frontend").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use(morgan("combined"))
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`> App started http://localhost:${port}`);
  });
