import express from "express";
import session from "express-session";
import i18next from "i18next-http-middleware";
import methodOverride from "method-override";

import passport from "@server/auth";
import i18n from "i18n";
import routes from "routes";

const app = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(express.urlencoded({ extended: true }))
  .use(
    session({ secret: "keyboard cat", resave: false, saveUninitialized: false })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(
    methodOverride(function (req) {
      if (req.body && typeof req.body === "object" && "_method" in req.body) {
        const method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  )
  .use(i18next.handle(i18n))
  .use(routes("server"));

export default app;
