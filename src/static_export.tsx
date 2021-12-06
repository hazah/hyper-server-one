import React from "react";
import { renderToString } from "react-dom/server";
import HtmlController from "@infra/http/formats/html_controller";

import Controller from "@infra/http/controller";
import App from "@app/screens/App";
import Document from "@app/Document";
import config, { filterConfigForClient } from "config";
import theme from "theme";
let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();
class ApplicationController extends HtmlController {
  protected env = filterConfigForClient(config);
  protected app = App;
  protected assets = assets;
  protected theme = theme;

  protected performAction(): void | Promise<void> {
    HtmlController.template = { Document: Document };

    this.ok();
  }
}

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
