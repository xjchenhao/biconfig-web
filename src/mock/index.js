// import { isIE } from '@/utils/util';

// 判断环境 preview 是 true 时，加载 mock 服务
if (process.env.VUE_APP_isMock === 'true') {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
  const Mock = require('mockjs2');
  require('./services/graph');
  require('./services/page');
  require('./services/dataSource');

  Mock.setup({
    timeout: 800, // setter delay time
  });
  console.log('[antd-pro] mock mounted');
}
