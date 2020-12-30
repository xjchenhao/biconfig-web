import Mock from 'mockjs2';
import { logAop } from './../util';
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

const graphList = () => {

  return {
    code: '0',
    msg: 'OK',
    data: {
      list: [
        {
          year: '1951 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            350,
            380,
          ],
          name: '收入',
        },
        {
          year: '1952 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            490,
            520,
          ],
          name: '收入',
        },
        {
          year: '1956 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            580,
            610,
          ],
          name: '收入',
        },
        {
          year: '1957 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            1420,
            1450,
          ],
          name: '收入',
        },
        {
          year: '1958 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            450,
            480,
          ],
          name: '收入',
        },
        {
          year: '1951 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            8,
            38,
          ],
          name: '支出',
        },
        {
          year: '1952 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            22,
            52,
          ],
          name: '支出',
        },
        {
          year: '1956 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            31,
            61,
          ],
          name: '支出',
        },
        {
          year: '1957 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            115,
            145,
          ],
          name: '支出',
        },
        {
          year: '1958 年',
          value: Mock.mock('@float(0, 1000)'),
          valueArray: [
            18,
            48,
          ],
          name: '支出',
        },
      ],
    },
  };
};

Mock.mock(new RegExp(`${apiPrefix}/demo/dataSource/column`), 'get', logAop(graphList));
