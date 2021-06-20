import express from 'express';
import Controller from '@infra/http/controller';
import HtmlController from '@infra/http/html_controller';

import App from 'App';
import Document from 'Document';


let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

class ApplicationController extends HtmlController {
  protected app = App;
  protected assets = assets;

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
  .get('/*', Controller.create(ApplicationController));

export default server;
