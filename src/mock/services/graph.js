import Mock from 'mockjs2';
import { getQueryParameters, logAop } from './../util';
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

const getList = options => {
  const queryParameters = getQueryParameters(options);

  return {
    code: '0',
    msg: 'OK',
    data: {
      list: [{
        titleShowType: 1,
        timeFilterShowType: 0,
        id: Mock.mock('@guid'),
        name: queryParameters.name || Mock.mock('@name'),
        uri: '我是初始图表记录1的uri',
        type: queryParameters.type || 'Bar',
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
      }],
    },
  };
};

const getDetail = () => {

  return {
    code: '0',
    msg: 'OK',
    data: {
      type: 'Pie',
      name: 'Sharon Harris',
      uri: '我是初始图表记录1的uri',
      apiUrl: '/biconfigApi/demo/dataSource/column',
      attr: {
        angleField: 'value',
        colorField: 'year',
        columnWidthRatio: 0.5,
        marginRatio: 0.5,
        meta: {},
      },
      timeFilterShowType: 0,
      titleShowType: 1,
    },
  };
};

const resOk = () => {
  return {
    code: '0',
    msg: 'OK',
    data: {},
  };
};

Mock.mock(new RegExp(`${apiPrefix}/graph/list`), 'get', logAop(getList));
Mock.mock(new RegExp(`${apiPrefix}/graph/detail`), 'get', logAop(getDetail));
Mock.mock(new RegExp(`${apiPrefix}/graph/view`), 'get', logAop(getDetail));
Mock.mock(new RegExp(`${apiPrefix}/graph/create`), 'post', logAop(resOk));
Mock.mock(new RegExp(`${apiPrefix}/graph/update`), 'post', logAop(resOk));
Mock.mock(new RegExp(`${apiPrefix}/graph/del`), 'post', logAop(resOk));
