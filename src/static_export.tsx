import React from "react";
import { renderToString } from "react-dom/server";
import HtmlController from "@infra/http/html_controller";

import { ApplicationController } from "server";
import Controller from "@infra/http/controller";

class StaticController extends ApplicationController {
  protected async ok() {
    const { markup, css, redirect } = await this.markup();
    if (redirect) {
      this.redirect(redirect);
    } else {
      const { assets } = this;
      this.render('Document', { markup, css, assets });
    }
  }

  private render(layout: string, options: { markup: string; css: string; assets: any; }) {
    const Template = HtmlController.template[layout];
    let html: string;

    if (Template) {
      const { markup, assets } = options;
      const props = { markup, assets };
      html = `<!doctype html>${renderToString(<Template {...props}/>)}`;
    } else {
      html = options.markup;
    }

    this.res.json({ html });
  }

  private redirect(_path: string) {

  }
}


export const render = (req, res) => {
  const handler = Controller.create(StaticController);
  handler(req, res);
};

export const routes = () => {
  return ['/'];
};
