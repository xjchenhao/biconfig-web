import utilsRequest from '@/utils/request';
let request = utilsRequest;

const userApi = {
  list: '/biconfigApi/graph/list',
  create: '/biconfigApi/graph/create',
  update: '/biconfigApi/graph/update',
  delete: '/biconfigApi/graph/delete',
  view: '/biconfigApi/graph/view',
  detail: '/biconfigApi/graph/detail',
};

export function replaceRequest(_this) {
  request = _this.$root.request;
}
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
