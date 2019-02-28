/**
 * switch config
 */
// 生产环境判断
const productionFlag = process.env.NODE_ENV === 'production'
// 生产环境 js sourcemap
const productionSourceMap = !productionFlag
// 生产环境 css sourcemap
const cssSourceMap = !productionFlag
// 开发环境 ajax 请求转发设置
const proxy = {
  '/api': {
    target: 'http://localhost:8084',
    ws: true,
    changeOrigin: true
  }
}
// build 打包生产代码，同时生产 zip 文件
const zipPackage = false

// config export
module.exports = {
  publicPath: productionFlag ? './' : '/',
  filenameHashing: false,
  devServer: {
    proxy
  },
  productionSourceMap,
  css: {
    sourceMap: cssSourceMap
  },
  configureWebpack: config => {
    // 添加打压缩包插件
    if (zipPackage) {
      const ZipPlugin = require('zip-webpack-plugin')
      config.plugins.push(
        /* eslint-disable no-new */
        new ZipPlugin({
          path: config.output.path,
          outPath: config.output.path,
          filename: 'archive.zip'
        })
      )
    }
  },
  chainWebpack: config => {
    // 为 svg 添加新 loader，以便封装 svg 图标
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .tap(options => {
        return { symbolId: 'icon-[name]' }
      })
      .end()
  }
}
