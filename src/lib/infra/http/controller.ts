import { NextFunction, Request, Response } from "express";
import { Helmet } from "react-helmet";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";
import { Theme } from "@emotion/react";
import { Http } from "../HttpProvider";

type HandlerMethods = {
  format: any;
  params: any;
  user?: any;
  req: Request;
  render: (options: any) => void;
  end: (arg: any) => void;
  redirect: (path: string) => void;
  next: NextFunction;
};

type Handler = (methods: HandlerMethods) => void;

export default class Controller {
  public constructor(private handler: Handler, private theme?: Theme) {}

  private render(
    req: Request,
    res: Response,
    next: (error?: Error) => void,
    { template, layout, ...options }: any
  ) {
    const { url } = req;
    const key = "css";
    const cache = createCache({ key });
    const { extractCritical } = createEmotionServer(cache);
    const context: Http = { static: true };

    options = {
      isStatic: process.env.MODE === "server-only",
      isApp: template ? false : true,
      url,
      cache,
      context,
      ...options,
    };

    res.render(template ?? "App", options, (error, html) => {
      if (error) {
        next(error);
      } else {
        if (context.url) {
          if (context.status) {
            res.redirect(context.status, context.url);
          } else {
            res.redirect(context.url);
          }
        } else if (template && !layout) {
          res.send(html);
        } else {
          const helmet = Helmet.renderStatic();

          const htmlAttributes = helmet.htmlAttributes.toComponent();
          const bodyAttributes = helmet.bodyAttributes.toComponent();

          const title = helmet.title.toComponent();
          const meta = helmet.meta.toComponent();
          const link = helmet.link.toComponent();
          const script = helmet.script.toComponent();
          const style = helmet.style.toComponent();

          const { ids, css } = extractCritical(html);

          const options = {
            html,
            htmlAttributes,
            bodyAttributes,
            title,
            meta,
            link,
            script,
            style,
            ids,
            css,
            isStatic: true, // always staic, never hydrated
            isLayout: true, // prevents theming the application shell
          };

          res.render("Shell", options, (error, html) => {
            if (error) {
              next(error);
            } else {
              res.send(`<!DOCTYPE html>${html}`);
            }
          });
        }
      }
    });
  }

  public get middleware(): any {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = req.user;
      const theme = this.theme;
      
      const format = (formats: any) => res.format(formats);
      const end = (arg: any) => res.end(arg);

      const render = (options: any) => this.render(req, res, next, { user, theme, ...options });
      const redirect = (path: string) => res.redirect(path);

      const params = { ...req.params, ...req.body, };

      this.handler({ format, render, end, redirect, params, req, user, next });
    };
  }
}