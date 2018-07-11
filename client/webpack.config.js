const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[hash].js"
  },
  devServer: {
    proxy: {
      "/api/**": "http://localhost:5000"
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          query: {
            plugins: ["transform-object-rest-spread"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {}),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css"
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      hash: true,
      inject: false
    })
  ]
};
