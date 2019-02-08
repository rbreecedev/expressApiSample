// Imports: Dependencies
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
require("babel-register");
// Webpack Configuration
const config = {
  
  // Entry
  entry: './index.js',
  // Output
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }
    ]
  },
  // Plugins
  plugins: [
    new htmlWebpackPlugin({
      template: './build/index.html',
      filename: 'index.html',
      hash: true
    })
  ],
  watch: true,
  devtool: 'source-map',
  target: "node"
};
// Exports
module.exports = config;