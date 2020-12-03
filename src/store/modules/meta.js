
const user = {
  state: {
    alias: '',
    values: [ '', '' ],
    min: '',
    max: '',
    formatter: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
  },

  actions: {
    // // 登录
    // Login({ commit }, userInfo) {
    //   return new Promise((resolve, reject) => {
    //     login(userInfo).then(response => {
    //       const result = response.result;
    //       storage.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
    //       commit('SET_TOKEN', result.token);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },

  },
};

export default user;
