const path = require('path');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const typedocConfig = require('./typedoc.json');

module.exports = {
  mode: 'none',
  entry: './src/index.ts',
  output: {
    library: 'aspect',
    libraryTarget: 'commonjs2',
    filename: 'aspect.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  devtool: 'source-map',
  externals: [],
  resolve: {
    extensions: ['.','.js','.ts', '.tsx'],
  },
  plugins: [
    new TypedocWebpackPlugin(Object.assign(typedocConfig, {
      out: path.resolve('./docs'),
    }), './src')
  ]
};
