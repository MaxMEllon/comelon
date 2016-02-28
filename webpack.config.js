'use strict';

var webpack = require('webpack');
var path = require('path');
var JsonpTemplatePlugin = webpack.JsonpTemplatePlugin;
var FunctionModulePlugin = require('webpack/lib/FunctionModulePlugin');
var NodeTargetPlugin = require('webpack/lib/node/NodeTargetPlugin');

var opt = {
  path: path.resolve('./bundle/js'),
  filename: 'main.js',
  libraryTarget: 'commonjs2'
};

var webpackConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  entry: ['./scripts/main.js'],
  output: opt,
  debug: true,
  devtool: 'eval',
  externals: ['electron', 'remote', 'nicolive'],
  plugins: [
    new webpack.NoErrorsPlugin(),
    new NodeTargetPlugin()
  ],
  module: {
    loaders: [ {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.js$/,
      loader: 'webpack-strip?strip[]=console.log'
    } ]
  }
};

webpackConfig.target = function renderer (compiler) {
  compiler.apply(
    new JsonpTemplatePlugin(opt),
    new FunctionModulePlugin(opt)
  );
};

module.exports = webpackConfig;
