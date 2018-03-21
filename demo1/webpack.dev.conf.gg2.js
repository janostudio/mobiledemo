const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseWebpackConfig = require('../build/webpack.base.conf.gg2');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(baseWebpackConfig, {
    entry: { app: ["./demo1/statics/css/index.styl", "./demo1/statics/js/index.js", "./build/dev-client"]}, 
    output: {
        path: path.resolve(__dirname, "/demo1/"), 
        filename: "index.js",
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            '@': resolve('demo1'),
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './demo1/index.html',
            inject: true
        })
    ]
})
