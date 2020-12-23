
const apiPrefix = process.env.VUE_APP_apiPrefix || '';

const userApi = {
  list: apiPrefix + '/graph/list',
  create: apiPrefix + '/graph/create',
  update: apiPrefix + '/graph/update',
  delete: apiPrefix + '/graph/delete',
  view: apiPrefix + '/graph/view',
  detail: apiPrefix + '/graph/detail',
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
