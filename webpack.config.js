const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve:
    {
      extensions: ['.js', '.css', '.json'],
    },
  optimization:
    {
      splitChunks: {
        chunks: 'all',
      },
    },
  devServer:
    {
      port: 4000,
    },
  plugins:
        [
          new HTMLWebpackPlugin({
            template: './index.html',
          }),
          new CleanWebpackPlugin(),
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './assets/favicon.svg'),
                to: path.resolve(__dirname, 'dist'),
              },
            ],
          }),
        ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: ['file-loader'],
      },

    ],
  },
};