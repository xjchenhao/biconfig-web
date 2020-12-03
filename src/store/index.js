import { createStore } from 'vuex';

// import meta from './modules/meta';

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters';

export default createStore({
  modules: {
    // meta,
    name: '',
    uri: '',
    type: 'Column',
    apiUrl: '',
    timeFilterShowType: 0,
    titleShowType: 0,
    data: [],
  },
  state: {
    meta: null,
  },
  mutations: {
    setName: (state, value) => {
      state.name = value;
    },
    setUri: (state, value) => {
      state.uri = value;
    },
    setType: (state, value) => {
      state.type = value;
    },
    setTimeFilterShowType: (state, value) => {
      state.timeFilterShowType = value;
    },
    setTitleShowType: (state, value) => {
      state.titleShowType = value;
    },
    setData: (state, value) => {
      state.data = value;
    },
  },
  actions: {
    setBasicForm({ commit }, { name, uri, type, timeFilterShowType, setTitleShowType }) {
      commit('setName', name);
      commit('setUri', uri);
      commit('setType', type);
      commit('setTimeFilterShowType', timeFilterShowType);
      commit('setSetTitleShowType', setTitleShowType);
    },
    setData({ commit }, value) {
      commit('setData', value);
    },
  },
  getters,
});
