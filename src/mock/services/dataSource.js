import Mock from 'mockjs2';
// import { getQueryParameters } from './../util';
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

const graphList = options => {
//   const queryParameters = getQueryParameters(options);

  const result = {
    code: '0',
    msg: 'OK',
    data: {
      list: [
        {
          year: '1951 年',
          value: 380,
          valueArray: [
            350,
            380,
          ],
          name: '收入',
        },
        {
          year: '1952 年',
          value: 520,
          valueArray: [
            490,
            520,
          ],
          name: '收入',
        },
        {
          year: '1956 年',
          value: 610,
          valueArray: [
            580,
            610,
          ],
          name: '收入',
        },
        {
          year: '1957 年',
          value: 1450,
          valueArray: [
            1420,
            1450,
          ],
          name: '收入',
        },
        {
          year: '1958 年',
          value: 480,
          valueArray: [
            450,
            480,
          ],
          name: '收入',
        },
        {
          year: '1951 年',
          value: 38,
          valueArray: [
            8,
            38,
          ],
          name: '支出',
        },
        {
          year: '1952 年',
          value: 52,
          valueArray: [
            22,
            52,
          ],
          name: '支出',
        },
        {
          year: '1956 年',
          value: 61,
          valueArray: [
            31,
            61,
          ],
          name: '支出',
        },
        {
          year: '1957 年',
          value: 145,
          valueArray: [
            115,
            145,
          ],
          name: '支出',
        },
        {
          year: '1958 年',
          value: 48,
          valueArray: [
            18,
            48,
          ],
          name: '支出',
        },
      ],
    },
  };

  console.log('-----mock数据log start----');
  console.log('请求入参：', options);
  console.log('输出mock数据：', result);
  console.log('-----mock数据log end----');

  return result;
};

Mock.mock(new RegExp(`${apiPrefix}/demo/dataSource/column`), 'get', graphList);
