const namespaced = 'page';

const page = {
  namespaced: !!namespaced,
  state: {
    isRenderLock: true,
    isPreview: false,
    currentIndex: '',
    graphList: [{
      uri: 'test0',
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
    previewData: [],
  },
  mutations: {
    setPreviewData: (state, value) => {
      state.previewData = value;
    },
    setCurrentIndex: (state, value) => {
      state.currentIndex = value;
    },
    setGraphList: (state, value) => {
      state.graphList = value;
    },
    setGraphItem: (state, { index, value }) => {
      state.graphList.splice(index, 1, value);
    },
    setRenderLock: (state, value) => {
      state.isRenderLock = value;
    },
    setPreview: (state, value) => {
      state.isPreview = value;
    },
  },
  actions: {
    addPreviewData({ commit }, value) {
      const { previewData } = namespaced ? this.state[namespaced] : this.state;
      let result = [ ...previewData ];

      result = result.concat(value);

      commit('setPreviewData', result);
    },
    deletePreviewData({ commit }, uri) {
      const { previewData } = namespaced ? this.state[namespaced] : this.state;

      const index = previewData.findIndex(item => {
        return item.uri === uri;
      });

      const result = [ ...previewData ];

      result.splice(index, 1);

      commit('setPreviewData', result);
    },
    cleanPreviewData({ commit }) {
      commit('setPreviewData', []);
    },
    setPreview({ commit }, value) {
      commit('setPreview', value);
    },
    setCurrentIndex({ commit }, value) {
      commit('setCurrentIndex', value);
    },
    setRenderLock({ commit }, value) {
      commit('setRenderLock', value);
    },
    setGraphList({ commit }, value) {
      commit('setGraphList', value);
    },
    setGraphItem({ commit }, { index, value: { uri } }) {
      const { graphList } = namespaced ? this.state[namespaced] : this.state;
      const itemData = graphList[index];
      console.log(uri);

      commit('setGraphItem', {
        index,
        value: {
          ...itemData,
          uri,
        },
      });
    },
    addGraph({ commit }, { uri = '', size, sort = 0 }) {
      const { graphList } = namespaced ? this.state[namespaced] : this.state;
      const graphListLength = graphList.length;

      const result = [ ...graphList ];
      result.push({ uri, sort, size });

      console.log(graphListLength);

      commit('setGraphList', result);
      commit('setCurrentIndex', graphListLength);
    },
    deleteGraph({ commit, dispatch }, uri) {
      const { graphList } = namespaced ? this.state[namespaced] : this.state;
      const graphListLength = graphList.length;

      const index = graphList.findIndex(item => {
        return item.uri === uri;
      });

      const result = [ ...graphList ];

      result.splice(index, 1);

      commit('setGraphList', result);
      dispatch('deletePreviewData', uri);

      if (graphListLength === 0) {
        commit('setCurrentIndex', '');
      }
    },
  },
};

export default page;
