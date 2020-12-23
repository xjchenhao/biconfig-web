const namespaced = 'page';

const page = {
  namespaced: !!namespaced,
  state: {
    isRenderLock: true,
    graphList: [{
      uri: 'test2',
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
  },
  mutations: {
    setGraphList: (state, value) => {
      state.graphList = value;
    },
    setRenderLock: (state, value) => {
      state.isRenderLock = value;
    },
  },
  actions: {
    setRenderLock({ commit }, value) {
      commit('setRenderLock', value);
    },
    setGraphList({ commit }, value) {
      commit('setGraphList', value);
    },
    addGraph({ commit }, { uri, sort }) {
      const { graphList } = namespaced ? this.state[namespaced] : this.state;

      graphList.push({ uri, sort });

      commit('setGraphList', graphList);
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
