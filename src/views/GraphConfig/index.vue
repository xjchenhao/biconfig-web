<template>
  <div>
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
          @update="chartDataUpdate"
        />
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import { PageHeader, Layout } from 'ant-design-vue';
import GraphConfigChart from './GraphConfigChart';
import GraphConfigForm from './GraphConfigForm';
export default {
  name: 'GraphConfig',
  components: {
    aPageHeader: PageHeader,
    aLayout: Layout,
    aLayoutSider: Layout.sider,
    aLayoutContent: Layout.content,
    GraphConfigChart,
    GraphConfigForm,
  },
  data() {
    return {
      chartData: [],
      chartType: 'Column',
      chartOpts: {},
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    chartDataUpdate(formData) {
      const { type, data, ...opts } = formData;

      this.chartType = type;
      this.chartData = data;
      this.chartOpts = opts;
    },
  },
};
</script>

<style lang="less" scoped>
.graphConfig-header{
  border-bottom: 1px solid rgb(235, 237, 240)
}
.graphConfig-layout{
  flex-direction: row;
  background-color:#fff;
  &-content{
    flex:1;
    align-items: center;
    justify-content: center;
    display: flex;
    &-chart{
      width:500px;
      height:500px;
    }
  }
  &-sider{
    border-left:1px solid rgb(235, 237, 240);
    width:500px;
    height:calc(100vh - 66px);
    overflow: scroll;
    box-sizing: border-box;
    padding:30px
  }
}
</style>
