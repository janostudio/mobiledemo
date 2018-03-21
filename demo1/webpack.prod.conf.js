const webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../build/webpack.bp.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')

const webpackconfig = merge(baseWebpackConfig, {
  entry: {
    app:[
      './demo1/statics/css/index.styl',
      './demo1/statics/js/index.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo1/index.html' 
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './statics/images'),
        to: './statics/images',
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, './statics/audio'),
        to: './statics/audio',
        ignore: ['.*']
      }
    ]),
    new cleanWebpackPlugin([
      './dist'
    ])
  ]
})

module.exports = webpackconfig