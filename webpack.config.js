const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const config = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/,
        use: [{ loader: 'file-loader?name=img/[name].[ext]' }],
      },
    ],
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/view/index.pug',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/img/favicon', to: './img/favicon', toType: 'dir' },
        { from: './src/img/favicon.ico', to: 'favicon.ico', toType: 'file' },
      ],
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: isProd ? 'production' : 'development',
  devServer: {
    noInfo: true,
    overlay: true,
    port: 3000,
    open: true,
    contentBase: path.join(__dirname, 'src'),
  },
};

module.exports = (env, options) => {
  const production = options.mode === 'production';
  config.devtool = production ? false : 'eval-cheap-module-source-map'; //best-source-map
  return config;
};
