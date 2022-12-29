const webpack = require('webpack');
const path = require('path');
const { chmodSync } = require('fs');

const projectRoot = path.resolve(__dirname, '.');

function setExecutable(file) {
  chmodSync(`${projectRoot}/bin/${file}`, 0o755);
}

const getPlugin =
  (callback) =>
    ({
      apply: ({ hooks }) =>
        hooks.assetEmitted.tap('CustomPlugin', callback),
    });


module.exports = {
  mode: 'production',
  target: 'node',
  externals: {
    express: 'express',
    pg: 'pg',
  },
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(`${__dirname}/tsconfig.json`),
      },
    }],
  },

  optimization: {
    minimize: false,
  },

  devtool: 'source-map',

  resolve: {
    mainFields: ['main', 'module'],
    modules: [
      path.resolve(__dirname, './node_modules/request/node_modules'),
      path.resolve(__dirname, './node_modules'),
      path.resolve(__dirname, './src'),
    ],
    extensions: ['.json', '.js', '.ts'],
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
      entryOnly: true,
    }),
    getPlugin(setExecutable),
  ],
  entry: {
    'blizzportal-api': `${projectRoot}/server.ts`,
  },
  output: {
    path: `${projectRoot}/bin`,
    filename: '[name].js',
    library: 'LIB',
    libraryTarget: 'commonjs2',
    sourceMapFilename: '[name].js.map',
  },
};