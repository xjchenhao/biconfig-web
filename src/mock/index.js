// import { isIE } from '@/utils/util';
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('VUE_APP_PREVIEW：', process.env.VUE_APP_PREVIEW);
console.log('VUE_APP_apiPrefix：', process.env.VUE_APP_apiPrefix);

// 判断环境 preview 是 true 时，加载 mock 服务
if (process.env.VUE_APP_PREVIEW === 'true') {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  const Mock = require('mockjs2');
  require('./services/graph');
  // require('./services/user');
  // require('./services/manage');
  // require('./services/other');
  // require('./services/tagCloud');
  // require('./services/article');

  Mock.setup({
    timeout: 800, // setter delay time
  });
  console.log('[antd-pro] mock mounted');
}
