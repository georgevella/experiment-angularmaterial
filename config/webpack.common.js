var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    //    'vendor': './src/vendor.ts',
    app: "./src/main.ts"
  },

  resolve: {
    extensions: [".ts", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            //loader: 'awesome-typescript-loader',
            loader: "@ngtools/webpack",
            options: { tsConfigPath: helpers.root("src", "tsconfig.app.json") }
          } //, 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: "raw-loader",
        exclude: [helpers.root("src/index.html")]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "file-loader?name=assets/[name].[hash].[ext]"
      },
      {
        test: /\.css$/,
        use: ["to-string-loader", "style-loader", "css-loader"]
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /\@angular(\\|\/)core(\\|\/)esm5/,
      helpers.root("./src"), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "polyfills"]
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
