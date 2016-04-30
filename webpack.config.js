'use strict';

const webpack = require('webpack');
const path = require('path');
const JsonpTemplatePlugin = webpack.JsonpTemplatePlugin;
const FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
const NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');

const opt = {
  path: path.resolve('./bundle/js'),
  filename: 'main.js',
  libraryTarget: 'commonjs2'
};

let webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  entry: ['./scripts/main.js'],
  output: opt,
  externals: ['nicolive'],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new NodeTargetPlugin(),
    new webpack.ExternalsPlugin('commonjs', ['electron'])
  ],
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, ]
  }
};

webpackConfig.target = function renderer (compiler) {
  compiler.apply(
    new JsonpTemplatePlugin(opt),
    new FunctionModulePlugin(opt)
  );
};

module.exports = webpackConfig;
