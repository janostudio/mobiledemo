const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
var config = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../build/webpack.base.conf');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    entry: {
        app: [
            "webpack-hot-middleware/client?noInfo=true&reload=true",
            "./demo1/statics/css/index.css",
            "./demo1/statics/js/index.js"
        ]}, 
    output: {
        path: config.assetsRoot, 
        filename: '[name].[hash].js'
    },
    resolve: {
        alias: {
            '@': resolve('demo1'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: './demo1/index.html',
            template: './demo1/index.html',
            inject: true
        })
    ]
})
