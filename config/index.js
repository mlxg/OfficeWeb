// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var dirName = process.argv[2] || 'PC'

module.exports = {
  build: {
    dirName: './app/'+ dirName,
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/'+ dirName +'/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/' + dirName),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/f': {
       target: 'http://192.168.1.44:8080',
       changeOrigin: true
      },
      '/a': {
        target: 'http://192.168.1.44:8080',
        changeOrigin: true
      },
      '/staroffice_act': {
        target: 'http://192.168.1.44:8081',
        changeOrigin: true
      },
      '/workflowengine': {
        target: 'http://192.168.1.44:8081',
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
