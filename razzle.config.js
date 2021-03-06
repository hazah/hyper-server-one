/* jshint -W097  */
/* jshint -W117  */
/* jshint esversion: 6 */
"use strict";

const path = require("path");
const webpack = require("webpack");
const Workbox = require("workbox-webpack-plugin");

module.exports = {
  modifyOptions({
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the default options/ options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
  }) {
    // Do some stuff...
    return razzleOptions;
  },
  modifyPaths({
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
    paths, // the default paths that will be used by Razzle.
  }) {
    // Do some stuff...
    return paths;
  },
  modifyWebpackOptions({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the default options that will be used to configure webpack/ webpack loaders and plugins
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    if (target === "web") {
      // client only
    }
    if (target === "node") {
      // server only
    }
    if (dev) {
      // dev only
    } else {
      // prod only
    }
    // Do some stuff...
    return webpackOptions;
  },
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the modified options that was used to configure webpack/ webpack loaders and plugins
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    if (target === "web") {
      // client only
      if (process.env.MODE === "server") {
        webpackConfig.entry.client = path.join(__dirname, '/src/server_client');
      }
    }
    if (target === "node") {
      // server only
      webpackConfig.plugins.push(
        new webpack.EnvironmentPlugin(['MODE', 'NODE_ENV'])
      );
    }
    if (dev) {
      // dev only
    } else {
      // prod only
    }
    
    // webpackConfig.plugins.push(
    //   new Workbox.InjectManifest({ 
    //     swSrc: "./src/service_worker.ts",
    //     swDest: "public/service_worker.js",
    //     modifyURLPrefix: {
    //       "/public": "",
    //     },
    //     exclude: [
    //       "server.js",
    //       "static_export.js",
    //     ],
    //   })
    // );
    
    // Do some stuff...
    return webpackConfig;
  },
  modifyJestConfig({
    jestConfig, // the created jest config
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    // Do some stuff...
    return jestConfig;
  },
};
