import request from '@/utils/request';

const userApi = {
  column: '/biconfigApi/demo/dataSource/column',
};

export function getColumnData() {
  return request({
    url: userApi.column,
    method: 'get',
  });
}
