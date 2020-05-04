'use strict'
const fs = require('fs')
const path = require('path')
const config = require('./config')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const pkg = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.assetsPath1 = function(resourcePath, entry) {

  // console.log(resourcePath, resourceQuery, 'lookdfklsdfk..............................')
  // console.log('[folder], [ext], [path], [name]')
  // console.log(entry)
  let target = null;
  let match;

  Object.keys(entry).forEach((item) => {
    const a = new RegExp('\\/(' + item + ')\\/')

    match = resourcePath.match(a)

    if (match) {
      if(!target) {
        target = match[1];
      } else {
        throw new Error(target + '匹配到不止一个入口')
      }
    }
    
  })

  return target;
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      // minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  var postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }


    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      // return ExtractTextPlugin.extract({
      //   use: loaders,
      //   fallback: 'vue-style-loader'
      // })
      const a = [options.extract].concat(loaders);
    
      // console.log(loader, ':', a)
      return a
  
    } else {
      const a = ['vue-style-loader'].concat(loaders);
    
      // console.log(loader, ':', a)
      return a
  
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  console.log(options, 'wo kao.......')
  const output = []
  const loaders = exports.cssLoaders(options)


  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.createNotifierCallback = function () {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') {
      return
    }
    const error = errors[0]

    const filename = error.file.split('!').pop()
    notifier.notify({
      title: pkg.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.getEntry = function(projectsDir) {
  return fs.readdirSync(projectsDir).reduce((entries, dir) => {
    const fullDir = path.join(projectsDir, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = entry
    }

    return entries
  }, {})
}

exports.getHtmls = function(entries, HtmlWebpackPlugin, projectsDir) {
  var htmlArray = [];

  Object.keys(entries).forEach(function(element){
    let obj = {
      _html:element,
      title:'',
      chunks:[element]
    };
    
      htmlArray.push(new HtmlWebpackPlugin(getHtmlConfig(obj._html, obj.chunks, projectsDir)))
  })

  return htmlArray
}

var getHtmlConfig = function(name,chunks, projectsDir) {
  return {
      template:`${projectsDir}/${name}/${name}.html`,
      filename:`${name}.html`, // ${name}/
      inject: true,
      hash: false,
      chunks:[name]
  }
}


