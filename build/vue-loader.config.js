// const docsLoader = require.resolve('./doc-loader');

module.exports = (isDev) => {
  return {
    compiler: require('vue-template-compiler'),
    compilerOptions: {
      preserveWhitespace: false
    },
    extractCSS: !isDev,
    cssModules: {},
    postCss: {}
    // cssModules: {
    //     localIdentName: '[path]-[name]-[hash:base64:5]',
    //     camelCase: true
    // }
    // hotReload: false // 根据环境变量生成
    // loaders: {
    //     'docs': docsLoader
    // }
  }
}
