const express = require('express');
const webpack = require("webpack");
const fs = require('fs')
const app = express()
const opn = require('opn')
const devMiddleWare = require('webpack-dev-middleware');
const hotMiddleWare = require('webpack-hot-middleware');
const webpackconfig = require('./webpack.dev.conf');

const compiler = webpack(webpackconfig)
app.use(devMiddleWare(compiler, {
    publicPath: webpackconfig.output.publicPath,
    quiet: true,
    noInfo: true,
    stats: {
        colors: true,
        chunks: false
    }
}))
app.use(hotMiddleWare(compiler))

app.use('/statics', express.static(__dirname + '/statics'));
app.get('/', function(req, res, next){
    next();
})
 
app.listen(8200, function(e){
    opn('http://localhost:8200')
    console.log(`server start at 8200`);
});