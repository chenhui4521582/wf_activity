var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var webpack = require("webpack")

// 用happyPack发现速度没什么提升
var os = require('os');
var HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length});

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: utils.entries(),
  cache: {
    type: "filesystem"
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    // filename: '[name].js',
    filename: 'js/[name].[hash].js',         // 每个入口 js 文件的生成配置
    chunkFilename: 'js/[id].[hash].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  // externals: {
  //   'vue':'Vue',
  //   'vue-router': 'VueRouter',
  //   'element-ui': 'ELEMENT'
  // },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new HappyPack({
      id: 'jsx',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'styles',
      loaders: [ 'style-loader', 'css-loader', 'less-loader' ],
      threadPool: happyThreadPool
    })
 ],
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        include: [resolve('src')],
        exclude: /node_modules/,
        loader: 'happypack/loader?id=happybabel'
      }
    ],
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig,
        include: [resolve('src')],
      },
      {
        test: /\.less$/,
        //loader: 'style!css!less'
        use: 'happypack/loader?id=styles'
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=jsx',
        //loader: 'babel-loader?cacheDirectory=true',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      // {
      //   test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: utils.assetsPath('media/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

}
