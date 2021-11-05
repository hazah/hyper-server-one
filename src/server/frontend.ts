import express from "express";
import path from "path";
import Controller from "@infra/http/controller";
import HtmlController from "@infra/http/html_controller";

import config, { filterConfigForClient } from "config";

import App from "@app/App";
import Document from "@app/Document";

import theme from "theme";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

export class ApplicationController extends HtmlController {
  protected env = filterConfigForClient(config);
  protected app = App;
  protected assets = assets;
  protected theme = theme;

  protected performAction(): void | Promise<void> {
    HtmlController.template = { Document: Document };

    this.ok();
  }
}

const server = express()
  .engine("tsx", ApplicationController.engine())
  .set("views", "src/app")
  .set("view engine", "tsx")
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", Controller.create(ApplicationController));

export default server;
