'use strict';

const { resolve } = require('path')

module.exports = {
  entry: './app/Validations.js',
  output: {
    path: __dirname,
    filename: './public/index.js'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './app'),
        loader: 'babel-loader',

        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
};
