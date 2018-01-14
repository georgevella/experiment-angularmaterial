var webpackMerge = require('webpack-merge');
var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: "cheap-module-eval-source-map",

  output: {
    path: helpers.root("dist"),
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "[id].chunk.js"
  },

  plugins: [
    //new ExtractTextPlugin("[name].css"),
    new webpack.NamedModulesPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    stats: "minimal",
    watchOptions: {
      // if you're using Docker you may need this
      // aggregateTimeout: 300,
      // poll: 1000,
      ignored: /node_modules/
    }
  }
});
