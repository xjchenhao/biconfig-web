const namespaced = 'page';

const page = {
  namespaced: !!namespaced,
  state: {
    isPreview: false,
    currentIndex: '',
    graphList: [],
    previewData: [],
  },
  mutations: {
    setPreviewData: (state, value) => {
      state.previewData = value;
    },
    setPreviewDataItem: (state, { index, value }) => {
      state.previewData.splice(index, 1, value);
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
    setPreview: (state, value) => {
      state.isPreview = value;
    },
  },
  actions: {
    init({ commit }) {
      commit('setPreview', false);
      commit('setCurrentIndex', '');
      commit('setPreviewData', []);
      commit('setGraphList', []);
    },
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
    setPreviewDataItem({ commit }, { index, value }) {
      const { previewData } = namespaced ? this.state[namespaced] : this.state;
      const itemData = previewData[index];

      commit('setPreviewDataItem', {
        index,
        value: {
          ...itemData,
          data: value,
        },
      });
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
