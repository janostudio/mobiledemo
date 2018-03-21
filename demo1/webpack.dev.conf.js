const webpack = require("webpack");
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('../build/webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');

// const webpackconfig 
module.exports = merge(baseWebpackConfig, {
  entry: {
    app:[
      'webpack-hot-middleware/client',
      './demo1/statics/css/index.styl',
      './demo1/statics/js/index.js'
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: '[name].[hash].js'
  },
  // resolve: {
  //   modules: ["node_modules", "spritesmith-generated"]
  // },
  plugins: [
    new HtmlWebpackPlugin({
        template: './demo1/index.html' 
    })
    // new SpritesmithPlugin({
    //   src: {
    //     cwd: path.resolve(__dirname, './demo1/statics/origin-sprites'),
    //     glob: '*.png'
    //   },
    //   target: {
    //     image: path.resolve(__dirname, './demo1/statics/sprites/sprite.png'),
    //     css: path.resolve(__dirname, './demo1/statics/sprites/sprite.scss')
    //   },
    //   apiOptions: {
    //     cssImageRef: "~sprite.png"
    //   }
    // })
  ]
})
