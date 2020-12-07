<template>
  <div id="GraphConfig">
    <a-page-header
      class="graphConfig-header"
      title="配置规则"
      sub-title="图表的规则配置"
      @back="handleBack"
    />
    <a-layout class="graphConfig-layout">
      <a-layout-content
        class="graphConfig-layout-content"
      >
        <h1 v-show="isShowTitle">
          {{ title }}
        </h1>
        <graph-config-chart-filter
          class="graphConfig-layout-content-filter"
          v-show="isShowTimeFilter"
        />
        <graph-config-chart
          ref="chart"
          class="graphConfig-layout-content-chart"
          :data="chartData"
          :type="chartType"
          :opts="chartOpts"
        />
      </a-layout-content>
      <a-layout-sider class="graphConfig-layout-sider">
        <graph-config-form
          class="graphConfig-layout-content-form"
        />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import { PageHeader, Layout } from 'ant-design-vue';
import GraphConfigChart from './GraphConfigChart';
import GraphConfigForm from './GraphConfigForm';
import GraphConfigChartFilter from './GraphConfigChartFilter';

export default {
  name: 'GraphConfig',
  components: {
    aPageHeader: PageHeader,
    aLayout: Layout,
    aLayoutSider: Layout.sider,
    aLayoutContent: Layout.content,
    GraphConfigChart,
    GraphConfigForm,
    GraphConfigChartFilter,
  },
  data() {
    return {
      chartData: [],
      chartType: 'Column',
      chartOpts: {},
      title: '',
      isShowTitle: false,
      isShowTimeFilter: false,
    };
  },
  watch: {
    '$store.state.name': function(value) {
      this.title = value;
    },
    '$store.state.timeFilterShowType': function(value) {
      this.isShowTimeFilter = !!value;
    },
    '$store.state.titleShowType': function(value) {
      this.isShowTitle = !!value;
    },
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
#GraphConfig{
  height: 100%;
}
.graphConfig-header{
  border-bottom: 1px solid rgb(235, 237, 240)
}
.graphConfig-layout{
  flex-direction: row;
  background-color:#fff;
  height:100%;
  &-content{
    flex:1;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    h1{
      margin-bottom:30px;
      text-align:center;
    }
    &-filter{
      width:500px;
      margin-bottom:30px;
    }
    &-chart{
      width:500px;
      height:500px;
    }
  }
  &-sider{
    border-left:1px solid rgb(235, 237, 240);
    width:500px;
    height:calc(100% - 66px);
    overflow: scroll;
    box-sizing: border-box;
    padding:30px
  }
}
</style>
