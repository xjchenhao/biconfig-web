const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const { name } = require('./package');
const port = 8080; // dev port
const dev = process.env.NODE_ENV === 'development';

module.exports = {
  publicPath: dev ? `//localhost:${port}` : '/',
  devServer: {
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
      '/biconfigApi': {
        target: 'http://localhost:7001',
        changeOrigin: true,
        pathRewrite: { '^/biconfigApi': '/api' },
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
