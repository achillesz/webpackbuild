const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const ExtractPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// const VueClientPlugin = require('vue-server-renderer/client-plugin');

const isDev = process.env.NODE_ENV === 'development'

const defaultPluins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  // new HTMLPlugin({
  //   template: path.join(resolve('src/views'), 'index.html')
  // }),
  // new VueClientPlugin(),
  new VueLoaderPlugin()
];

const devServer = {
  port: 8000,
  host: 'localhost',
  open: true,
  openPage: ['/projecta/'],
  overlay: {
    errors: true
  },
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  },
  // historyApiFallback: {
  //   index: '/public/index.html'
  // }
}

let config;

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    devServer,
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  });
} else {
  config = merge(baseConfig, {
    // entry: {
    //   app: path.join(__dirname, '../src/entry.js'),
    //   vendor: ['vue']
    // },
    module: {
      rules: [{
        test: /\.styl/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all'
    //   },
    //   runtimeChunk: true
    // },
    plugins: defaultPluins.concat([
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        moduleFilename: ({ name }) => {
          console.log(name, '????????????????????')
          return `${name}/[id].[hash].css`
        },
        // filename: (chunkData) => {
        //   console.log(chunkData, 'n......')
        //   return  '[name]/[name].[hash].css';
        // },
        chunkFilename: '[id].[hash].css'
      }),
      new webpack.NamedChunksPlugin()
    ])
  })
}

config.resolve = {
  alias: {
    '@': resolve('src'),
    'common': resolve('src/common'),
    'api': path.join(__dirname, 'src/api')
  }
}

module.exports = config;
