import { Request, Response } from "express";
import { Helmet } from "react-helmet";
import createEmotionServer from "@emotion/server/create-instance";
import createCache from "@emotion/cache";

type HandlerMethods = {
  format: any;
  params: any;
  req: Request;
  render: (options: any) => void;
  end: (arg: any) => void;
  redirect: (path: string) => void;
};

type Handler = (methods: HandlerMethods) => void;

export default class Controller {
  public constructor(private handler: Handler) {}

  private render(
    _req: Request,
    res: Response,
    next,
    { template, layout, ...options }: any
  ) {
    const key = "css";
    const cache = createCache({ key });
    const { extractCritical } = createEmotionServer(cache);

    options = {
      isStatic: process.env.MODE === "server-only",
      isApp: template ? false : true,
      cache,
      ...options,
    };

    res.render(template ?? "App", options, (error, html) => {
      if (error) {
        next(error);
      } else {console.log('here');
        if (template && !layout) {
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

  public get middleware() {
    return (req: Request, res: Response, next) => {
      const format = res.format.bind(res);
      const render = (options: any) => () =>
        this.render(req, res, next, options);
      const end = (arg: any) => res.end(arg);
      const redirect = (path: string) => res.redirect(path);
      const params = req.params;

      this.handler({ format, render, end, redirect, params, req });
    };
  }
}
