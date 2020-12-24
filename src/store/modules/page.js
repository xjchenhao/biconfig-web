const namespaced = 'page';

const page = {
  namespaced: !!namespaced,
  state: {
    isRenderLock: true,
    graphList: [{
      uri: '',
      sort: 0,
      size: 'small',
    }, {
      uri: 'test3',
      sort: 0,
      size: 'small',
    }, {
      uri: 'test4',
      sort: 0,
      size: 'medium',
    }, {
      uri: 'test5',
      sort: 0,
      size: 'large',
    }],
    configForm: {
      uri: '',
    },
  },
  mutations: {
    setConfigForm: (state, value) => {
      state.configForm = value;
    },
    setGraphList: (state, value) => {
      state.graphList = value;
    },
    setRenderLock: (state, value) => {
      state.isRenderLock = value;
    },
  },
  actions: {
    setConfigForm({ commit }, value) {
      commit('setConfigForm', value);
    },
    setRenderLock({ commit }, value) {
      commit('setRenderLock', value);
    },
    setGraphList({ commit }, value) {
      commit('setGraphList', value);
    },
    addGraph({ commit }, { uri = '', size, sort = 0 }) {
      const { graphList } = namespaced ? this.state[namespaced] : this.state;

      const result = [ ...graphList ];
      result.push({ uri, sort, size });

      commit('setGraphList', result);
    },
    deleteGraph({ commit }, uri) {
      const { graphList } = namespaced ? this.state[namespaced] : this.state;

      const index = graphList.findIndex(item => {
        return item.uri === uri;
      });

      const result = [ ...graphList ];

      result.splice(index, 1);

      commit('setGraphList', result);
    },
  },
};

export default page;
