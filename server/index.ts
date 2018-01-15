import * as wpconf from '../config/webpack.dev.js';

import * as Webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { Configuration } from 'webpack-dev-server';

const serverOptions = {
  hot: true,
  inline: true,
  historyApiFallback: true,
  clientLogLevel: 'info',
  stats: {
    timings: true,
    colors: true,
    hash: true,
    version: true,
    assets: true,
    chunks: true,
    modules: true,
    warnings: true
  }
};

// setup hmr
const hmrEndpoints = [
  'webpack-dev-server/client?http://0.0.0.0:0',
  'webpack/hot/dev-server'
];
const conf = wpconf as Webpack.Configuration;

Object.keys(conf.entry).forEach(key => {
  if (key === 'main') {
    const entry = conf.entry[key];

    if (!Array.isArray(entry)) {
      conf.entry[key] = [...hmrEndpoints, entry];
    } else {
      conf.entry[key] = [...hmrEndpoints, ...entry];
    }
  }
});

wpconf.plugins.push(new Webpack.HotModuleReplacementPlugin());

const compiler = Webpack(wpconf);
const server = new WebpackDevServer(compiler, serverOptions);

console.log('Starting development host on port 3000');
server.listen(3000);
