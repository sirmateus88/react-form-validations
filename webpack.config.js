'use strict';

const { resolve } = require('path')

module.exports = {
  entry: './app/Validations.js',
  output: {
    path: __dirname,
    filename: './public/index.js',
    library: 'react-real-time-form-validation',
    libraryTarget: 'commonjs2'
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
