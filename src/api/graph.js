
const userApi = {
  list: '/biconfigApi/graph/list',
  create: '/biconfigApi/graph/create',
  update: '/biconfigApi/graph/update',
  delete: '/biconfigApi/graph/delete',
  view: '/biconfigApi/graph/view',
  detail: '/biconfigApi/graph/detail',
};

export function getList(parameter) {
  return {
    url: userApi.list,
    method: 'get',
    params: parameter,
  };
}

export function getView(parameter) {
  return {
    url: userApi.view,
    method: 'get',
    params: parameter,
  };
}

export function getDetail(parameter) {
  return {
    url: userApi.detail,
    method: 'get',
    params: parameter,
  };
}

export function create(parameter) {
  return {
    url: userApi.create,
    method: 'post',
    data: parameter,
  };
}

export function update(parameter) {
  return {
    url: userApi.update,
    method: 'post',
    data: parameter,
  };
}

export function del(parameter) {
  return {
    url: userApi.delete,
    method: 'post',
    data: parameter,
  };
}
