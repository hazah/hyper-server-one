import React from "react";
import { renderToString } from "react-dom/server";
import HtmlController from "@infra/http/formats/html_controller";

import { ApplicationController } from "@server/frontend";
import Controller from "@infra/http/controller";
import { HashRouter, StaticRouter } from "react-router-dom";
import {
  ServerStyleSheets,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core";

class StaticController extends ApplicationController {
  protected async ok() {
    const { markup, css, redirect } = await this.markup();
    if (redirect) {
      this.redirect(redirect);
    } else {
      const { assets, env } = this;
      this.render("Document", { markup, css, assets, env });
    }
  }

  private render(
    layout: string,
    options: { markup: string; css: string; assets: any; env: any }
  ) {
    const Template = HtmlController.template[layout];
    let html: string;

    if (Template) {
      const { markup, assets, css, env } = options;
      const props = { markup, assets, css, env };
      html = `<!doctype html>${renderToString(<Template {...props} />)}`;
    } else {
      html = options.markup;
    }

    this.res.json({ html });
  }

  private redirect(_path: string) {}
}

export const render = (req, res) => {
  const handler = Controller.create(StaticController);
  handler(req, res);
};

export const routes = () => {
  return ["/", "/about"];
};
