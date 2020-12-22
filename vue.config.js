const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const { name } = require('./package');
const devPort = process.env.VUE_APP_PORT || 8080; // dev port

const isPreview = process.env.VUE_APP_isMock === 'true';
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: isPreview ? {
    port: devPort,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  } : {
    hot: true,
    disableHostCheck: true,
    port: devPort,
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
        pathRewrite: { [ `^${apiPrefix}`]: '/api' },
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
