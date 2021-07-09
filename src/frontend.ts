import express from 'express';
import path from 'path';
import Controller from '@infra/http/controller';
import HtmlController from '@infra/http/html_controller';

import config, { filterConfigForClient } from 'config';

import App from 'App';
import Document from 'Document';

import theme from 'theme';

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
    HtmlController.template = { 'Document': Document };
    
    this.ok();
  }
}

const server = express()
  .engine('tsx', ApplicationController.engine())
  .set('views', './src')
  .set('view engine', 'tsx')
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/service-worker.js', (req, res) => process.env.NODE_ENV === "production"
    ? res.sendFile(path.join(__dirname, '/service-worker.js'))
    : res.type('text/javascript').send('//placeholder'))
  .get('/service-worker.js.map', (req, res) => process.env.NODE_ENV === "production"
    ? res.sendFile(path.join(__dirname, '/service-worker.js.map'))
    : res.type('text/javascript').send('//placeholder'))
  .get('/*', Controller.create(ApplicationController));

export default server;
