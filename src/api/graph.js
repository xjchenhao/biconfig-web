import request from '@/utils/request';

const userApi = {
  list: '/api/graph/list',
  create: '/api/graph/create',
  update: '/api/graph/update',
  delete: '/api/graph/delete',
  view: '/api/graph/view',
  detail: '/api/graph/detail',
};

export function getList(parameter) {
  return request({
    url: userApi.list,
    method: 'get',
    params: parameter,
  });
}

export function getView(parameter) {
  return request({
    url: userApi.view,
    method: 'get',
    params: parameter,
  });
}

export function getDetail(parameter) {
  return request({
    url: userApi.detail,
    method: 'get',
    params: parameter,
  });
}

export function create(parameter) {
  return request({
    url: userApi.create,
    method: 'post',
    data: parameter,
  });
}

export function update(parameter) {
  return request({
    url: userApi.update,
    method: 'post',
    data: parameter,
  });
}

export function del(parameter) {
  return request({
    url: userApi.delete,
    method: 'post',
    data: parameter,
  });
}
