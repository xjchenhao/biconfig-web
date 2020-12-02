import Mock from 'mockjs2';
import { getQueryParameters } from './../util';
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

const graphList = options => {
  const queryParameters = getQueryParameters(options);

  const result = {
    code: '0',
    msg: 'OK',
    data: {
      list: [{
        titleShowType: 1,
        timeFilterShowType: 0,
        _id: Mock.mock('@guid'),
        name: queryParameters.name || Mock.mock('@name'),
        uri: '我是初始图表记录1的uri',
        type: queryParameters.type || Mock.mock([ 'Bar' ]),
        apiUrl: '/biconfigApi/demo/dataSource/column',
        attr: {
          xField: 'year',
          yField: 'value',
          isGroup: false,
          isStack: false,
          isRange: false,
          isPercent: false,
          seriesField: '',
          columnWidthRatio: 0.5,
          marginRatio: 0.5,
          color: '#5694f5',
        },
        createTime: 1605060610000,
        updateTime: 1606715338013,
        id: '5d8ad6e2a9ed49004c33bd41',
      }],
    },
  };

  console.log('-----mock数据log start----');
  console.log('请求入参：', options);
  console.log('输出mock数据：', result);
  console.log('-----mock数据log end----');

  return result;
};

Mock.mock(new RegExp(`${apiPrefix}/graph/list`), 'get', graphList);
