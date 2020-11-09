import request from '@/utils/request';

const userApi = {
  list: '/api/graph/list',
};

export function getGraphList() {
  return request({
    url: userApi.list,
    method: 'get',
  });
}
