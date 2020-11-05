const path = require('path');
const resolve = dir => path.join(__dirname, dir);

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7001',
        changeOrigin: true,
      },
    },
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'));

    config.devServer.disableHostCheck = true;
  },
};
