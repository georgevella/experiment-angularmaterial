var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");

module.exports = {
  entry: {
    polyfills: "./src/polyfills.ts",
    main: "./src/main.ts",
    styles: ["./src/styles.css"]
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
            loader: "@ngtools/webpack",
            options: {
              tsConfigPath: helpers.root("src", "tsconfig.app.json")
            }
          }
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
        use: [
          //"exports-loader?module.exports.toString()",
          "to-string-loader",
          "css-loader"
        ],
        exclude: [helpers.root("src/styles.css")]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: [helpers.root("src/styles.css")]
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
    new HtmlWebpackPlugin({
      template: "src/index.html",
      xhtml: true,
      minify: false,
      chunksSortMode: (left, right) => {
        let entryPoints = [
          // required stuff goes here
          "inline",
          "polyfills",
          "sw-register",
          // global styles
          "styles",
          // vendor and main always go last
          "vendor",
          "main"
        ];

        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);

        if (leftIndex > rightindex) {
          return 1;
        } else if (leftIndex < rightindex) {
          return -1;
        } else {
          return 0;
        }
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      minChunks: Infinity,
      name: "inline"
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      chunks: ["main"],
      minChunks: (module, count) => {
        return module.resource && /node_modules/.test(module.resource);
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "main",
      async: "common",
      children: true,
      minChunks: 2
    })
  ]
};
