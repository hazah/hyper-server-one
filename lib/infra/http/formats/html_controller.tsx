import React, { FunctionComponent, HTMLAttributes, ReactElement } from "react";
import axios from "axios";
import Controller from "../controller";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { Helmet, HelmetData } from "react-helmet";
import {
  ServerStyleSheets,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";
import config from "config";

type EngineType = (
  path: string,
  options: any,
  callback: CallbackType
) => Promise<void>;

type CallbackType = (error?: Error, rendered?: string) => void;

export default abstract class HtmlController extends Controller {
  protected static template: {
    [key: string]: FunctionComponent<{ markup: any; assets: any }>;
  };
  protected env: any;
  protected assets: any;
  protected theme: any;
  protected app: FunctionComponent;

  private send(code: number, message: string): void | Promise<void> {
    this.res.status(code).send(message);
  }

  public static engine(): EngineType {
    return async (path: string, options: any, callback) => {
      try {
        const parts = path.split("/");
        const file = parts[parts.length - 1];
        const fileParts = file.split(".");
        const fileName = fileParts[0];

        const Template = HtmlController.template[fileName];

        if (Template) {
          const { helmet, markup, assets, css, env } = options;
          const props = { helmet, markup, assets, css, env };
          return callback(
            null,
            `<!doctype html>${renderToString(<Template {...props} />)}`
          );
        } else {
          return callback(null, options.markup);
        }
      } catch (error) {
        return callback(error);
      }
    };
  }

  protected async markup(): Promise<{
    helmet?: HelmetData;
    markup?: string;
    css?: string;
    redirect?: string;
  }> {
    const context: any = {};
    const App = this.app;
    const sheets = new ServerStyleSheets();

    const markup = renderToString(
      sheets.collect(
        <ThemeProvider theme={this.theme}>
          <CssBaseline />
          <StaticRouter context={context} location={this.req.url}>
            <App />
          </StaticRouter>
        </ThemeProvider>
      )
    );

    const helmet = Helmet.renderStatic();

    const font_css =
      config.NODE_ENV !== "development"
        ? await axios.get(
            // development mode doesn't generate a seperate css file, which means we don't
            // get fonts.
            "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          )
        : { data: "" };

    const css = `${font_css.data}${sheets.toString()}`;

    if (context.url) {
      return { redirect: context.url };
    } else {
      return { helmet, markup, css };
    }
  }

  protected async ok(withMarkup: boolean = true) {
    if (withMarkup) {
      const { helmet, markup, css, redirect } = await this.markup();
      if (redirect) {
        this.res.redirect(redirect);
      } else {
        const { assets, env } = this;
        this.res.status(200);
        this.res.type("html");
        this.res.render("Document", { helmet, markup, css, assets, env });
      }
    } else {
      this.res.status(200);
      this.res.send();
    }
  }

  protected created() {
    this.res.sendStatus(201);
  }

  protected clientError(message?: string) {
    this.send(400, message ? message : "Unauthorized");
  }

  protected unauthorized(message?: string) {
    this.send(401, message ? message : "Unauthorized");
  }

  protected paymentRequired(message?: string) {
    this.send(402, message ? message : "Payment required");
  }

  protected forbidden(message?: string) {
    this.send(403, message ? message : "Forbidden");
  }

  protected notFound(message?: string) {
    this.send(404, message ? message : "Not found");
  }

  protected conflict(message?: string) {
    this.send(409, message ? message : "Conflict");
  }

  protected tooMany(message?: string) {
    this.send(429, message ? message : "Too many requests");
  }

  protected todo() {
    this.send(400, "TODO");
  }

  protected fail(error: Error | string) {
    console.error(error);
    this.send(500, error.toString());
  }
}
