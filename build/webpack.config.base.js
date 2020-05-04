// const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const HTMLPlugin = require('html-webpack-plugin')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const projectsDir = path.join(__dirname, '../src/projects')
const entry = utils.getEntry(projectsDir)
const htmls = utils.getHtmls(entry, HTMLPlugin, projectsDir)

const config = {
  target: 'web',
  mode: process.env.NODE_ENV,
  entry: entry,
  // assetsRoot: path.resolve(__dirname, '../dist'),
  // assetsSubDirectory: 'static',
  // entry: path.join(__dirname, '../src/entry.js'),
  output: {
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].js' : '[name]/[name].[hash:8].js'
    },
    // filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: isDev ? 'http://127.0.0.1:8000/dist/' : '/dist/'
  },
  module: {
    rules: [
      {
        resourceQuery: /blockType=docs/,
        loader: require.resolve('./docs-loader.js')
      },
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/',
        enforce: 'pre' // 之前处理
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
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          esModule: false,
          limit: 10000,
          name (resourcePath, resourceQuery) {
          // `resourcePath` - `/absolute/path/to/file.js`
          // `resourceQuery` - `?foo=bar`
            const target = utils.assetsPath1(resourcePath, entry)
            if (process.env.NODE_ENV === 'development') {
              return utils.assetsPath('img/[name].[hash:7].[ext]')
            }

            return (target || 'static') + '/img/[name][contenthash].[ext]'
          }
          // outputPath: (url, resourcePath, context) => {
          //   console.log(url, resourcePath, context, 'url, resourcePath, context............')
          //   // `resourcePath` is original absolute path to asset
          //   // `context` is directory where stored asset (`rootContext`) or `context` option

          //   // To get relative path you can use
          //   // const relativePath = path.relative(context, resourcePath);

          //   if (/my-custom-image\.png/.test(resourcePath)) {
          //     return `other_output_path/${url}`;
          //   }

          //   if (/images/.test(context)) {
          //     return `image_output_path/${url}`;
          //   }

        //   return `output_path/${url}`;
        // }
        // name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name (resourcePath, resourceQuery) {
          // `resourcePath` - `/absolute/path/to/file.js`
          // `resourceQuery` - `?foo=bar`
            const target = utils.assetsPath1(resourcePath, entry)
            if (process.env.NODE_ENV === 'development') {
              return utils.assetsPath('media/[name].[hash:7].[ext]')
            }

            return (target || 'static') + '/media/[name][contenthash].[ext]'
          }
        // name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name (resourcePath, resourceQuery) {
          // `resourcePath` - `/absolute/path/to/file.js`
          // `resourceQuery` - `?foo=bar`
            const target = utils.assetsPath1(resourcePath, entry)
            if (process.env.NODE_ENV === 'development') {
              return utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }

            return (target || 'static') + '/fonts/[name][contenthash].[ext]'
          }
        // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    ...htmls
  ]

}

module.exports = config
