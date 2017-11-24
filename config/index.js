// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')


module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // https://www.jddfun.com/ http://10.33.85.160/ http://10.33.85.160/
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 3006,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {
        '/api_platform': {
            target: 'http://10.33.85.160/api_platform',
            changeOrigin: true,
            pathRewrite: {
              '^/api_platform':''
            },
            cookieDomainRewrite: ""
          },

          '/api_okooo': {
            target: 'http://10.33.85.160/api_okooo',
            changeOrigin: true,
            pathRewrite: {
              '^/api_okooo':''
            },
            cookieDomainRewrite: ""
          },
        '/api_ops': {
            target: 'http://10.33.85.160/api_ops',
            changeOrigin: true,
            pathRewrite: {
              '^/api_ops':''
            },
            cookieDomainRewrite: ""
          },
        '/api_mall': {
            target: 'http://10.33.85.160/api_mall',
            changeOrigin: true,
            pathRewrite: {
              '^/api_mall':''
            },
            cookieDomainRewrite: ""
          },
        '/api_inventory': {
            target: 'http://10.33.85.160/api_inventory',
            changeOrigin: true,
            pathRewrite: {
              '^/api_inventory':''
            },
            cookieDomainRewrite: ""
          },
        '/api_quoits': {
            target: 'http://10.33.85.160/api_quoits',
            changeOrigin: true,
            pathRewrite: {
              '^/api_quoits':''
            },
            cookieDomainRewrite: ""
          },
          '/api_app': {
              target: 'http://10.33.85.160/api_app',
              changeOrigin: true,
              pathRewrite: {
                '^/api_app':''
              },
              cookieDomainRewrite: ""
            },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },

}
