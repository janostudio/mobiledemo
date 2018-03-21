var path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  port: 8080,
  autoOpenBrowser: true,
  assetsRoot: path.resolve(__dirname, '../dist/'),
  assetsSubDirectory: 'statics',
  assetsPublicPath: '/demo1/',
  cssSourceMap: false
}