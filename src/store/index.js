import { createStore } from 'vuex';

import graph from './modules/graph';

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters';

export default createStore({
  modules: {
    graph,
  },
  // state: {
  //   isRenderLock: true,
  //   data: [],

  //   name: '',
  //   uri: '',
  //   type: 'Column',
  //   apiUrl: '',
  //   timeFilterShowType: 0,
  //   titleShowType: 0,
  //   opts: {
  //     fieldMap: {
  //       xField: 'year',
  //       yField: 'value',
  //       isGroup: false,
  //       isStack: false,
  //       isRange: false,
  //       isPercent: false,
  //       seriesField: '',
  //     },
  //     meta: {},
  //     style: {},
  //   },
  // },
  // mutations: {
  //   setName: (state, value) => {
  //     state.name = value;
  //   },
  //   setApiUrl: (state, value) => {
  //     state.apiUrl = value;
  //   },
  //   setUri: (state, value) => {
  //     state.uri = value;
  //   },
  //   setType: (state, value) => {
  //     state.type = value;
  //   },
  //   setTimeFilterShowType: (state, value) => {
  //     state.timeFilterShowType = value;
  //   },
  //   setTitleShowType: (state, value) => {
  //     state.titleShowType = value;
  //   },
  //   setData: (state, value) => {
  //     state.data = value;
  //   },
  //   setOptsMeta: (state, value) => {
  //     state.opts.meta = value;
  //   },
  //   setOptsFieldMap: (state, value) => {
  //     state.opts.fieldMap = value;
  //   },
  //   setStyle: (state, value) => {
  //     state.opts.style = value;
  //   },
  //   setRenderLock: (state, value) => {
  //     state.isRenderLock = value;
  //   },
  // },
  // actions: {
  //   getBasicForm() {
  //     const { name, uri, type, apiUrl, timeFilterShowType, titleShowType } = this.state;

  //     return {
  //       name,
  //       uri,
  //       type,
  //       apiUrl,
  //       timeFilterShowType,
  //       titleShowType,
  //     };
  //   },
  //   setBasicForm({ commit }, { name, uri, type, timeFilterShowType, titleShowType, apiUrl }) {
  //     commit('setName', name);
  //     commit('setUri', uri);
  //     commit('setApiUrl', apiUrl);
  //     commit('setType', type);
  //     commit('setTimeFilterShowType', timeFilterShowType);
  //     commit('setTitleShowType', titleShowType);
  //   },
  //   setData({ commit }, value) {
  //     commit('setData', value);
  //   },
  //   setOptsMeta({ commit }, value) {
  //     commit('setOptsMeta', value);
  //   },
  //   setOptsFieldMap({ commit }, value) {
  //     commit('setOptsFieldMap', value);
  //   },
  //   setStyle({ commit }, value) {
  //     commit('setStyle', value);
  //   },
  //   setRenderLock({ commit }, value) {
  //     commit('setRenderLock', value);
  //   },
  //   getGraphConfig() {
  //     const { opts } = this.state;
  //     return {
  //       ...opts.fieldMap,
  //       ...opts.style,
  //       meta: opts.meta,
  //     };
  //   },
  // },
  getters,
});
