const fs = require('fs')
const path = require('path');
const utils = require('./utils')
const HTMLPlugin = require('html-webpack-plugin');
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development'

const projectsDir = path.join(__dirname, '../src/projects');
let entry = utils.getEntry(projectsDir)
let htmls = utils.getHtmls(entry,HTMLPlugin, projectsDir);
console.log(htmls, 'x.....................')

const config = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: entry,
  // entry: path.join(__dirname, '../src/entry.js'),
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].js': '[name]/[name].js';
    },
    // filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/dist/'
  },
  module: {
    rules: [{
      resourceQuery: /blockType=docs/,
      loader: require.resolve('./docs-loader.js')
    },
    {
      test: /.vue$/,
      loader: 'vue-loader',
      options: createVueLoaderOptions(isDev)
    },
    {
      test: /.jsx$/,
      loader: 'babel-loader'
    },
    {
      test: /.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    },
    {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'resources/[path][name].[hash].[ext]'
        }
      }]
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    },
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
  plugins: [
    ...htmls
  ]
  
}

module.exports = config;
