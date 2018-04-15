const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // mode: 'development', /*webpack 4.0以上需要定义mode类型: production、 development */
  entry: {
    /*entry 设置入口，一个入口打包出一个文件，入口文件的路径可以用相对路径，也可以用绝度路径*/
    app: [resolve('jsapp.js'), './src/tsapp.ts'], /*入口的文件可以用数组*/
    cssapp: './src/cssapp.js',
    pageA: './src/pageA.js', /*入口的文件可以用字符串*/
    pageB: ['./src/pageB.js'],
    vendor: ['lodash', 'jquery']  /*vendor 用来打包第三方库*/
  },
  output: {
    /*output 设置出口*/
    path: path.resolve(__dirname, 'dist'), /*输出目录，必须使用绝对路径*/
    filename: '[name].bundle.js', /*输出文件名，[name]为占位符，会被entry里的key值替代*/
    chunkFilename: '[name].chunk.js'  /*非入口chunk的名称*/
  },
  module: {
    /*模块配置*/
    rules: [/*模块规则，使用各种loader解析对应文件*/
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.ts(x?)$/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              // insertInto: '#app', /*插入到哪个位置*/
              singleton: true, /*是否合并成一个style标签*/
              transform: './css.transform.js' /*用的不多，对css做一些js逻辑处理*/
            }
          },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  plugins: [/*插件*/
    new webpack.optimize.CommonsChunkPlugin({
      /*提取公共模块的插件*/
      name: 'common', /*公共模块的名字，如果是新名字，提取的公共模块为该名字*/
      minChunks: 2, /*公共模块出现的最少次数，这里设置出现2次就提取*/
      chunks: ['pageA', 'pageB']  /*显示的指定提取范围*/
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      /*公共模块名如果已经在entry的中指定，即为entry的key值，则选择该模块。*/
      /*vendor 指定提取第三方库，因为在入口中已经指定了vendor*/
      /*manifest 提取 webpackJsonp 的逻辑，保持第三方库的纯净*/
      minChunks: Infinity /*直接打包，不提取公共模块，可以理解为公共模块出现无穷多次才被提取*/
    })

  ],
}
