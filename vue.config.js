const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const { name } = require('./package');
const port = 8080; // dev port
const dev = process.env.NODE_ENV === 'development';

const isPreview = process.env.VUE_APP_PREVIEW === 'true';
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

module.exports = {
  publicPath: dev ? `//localhost:${port}` : '/',
  devServer: isPreview ? {
    port: 8080,
  } : {
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      [apiPrefix]: {
        target: 'http://localhost:7001',
        changeOrigin: true,
        pathRewrite: { [ `^/${apiPrefix}`]: '/api' },
      },
    },
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'));

    config.devServer.disableHostCheck = true;
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
