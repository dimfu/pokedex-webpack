/* eslint-disable new-cap */
/* eslint-disable import/no-unresolved */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/image'),
          to: path.resolve(__dirname, 'dist/image'),
        },
      ],
    }),
  ],
};
