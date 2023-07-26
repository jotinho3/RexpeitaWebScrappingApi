// webpack.config.js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './source/index.js', // Update with the correct entry point of your app
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
