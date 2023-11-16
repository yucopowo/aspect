const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './index.ts'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  devtool: 'cheap-module-eval-source-map',
  externals: [],
  resolve: {
    extensions: ['.','.js','.ts', '.tsx'],
  },
  plugins: [],
  devServer: {
    contentBase: path.join(__dirname, './public'),
  },
};
