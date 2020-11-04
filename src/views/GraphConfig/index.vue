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
          :data="chartData"
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
      chartData: [
        { year: '1951 年', value: 380, valueArray: [ 380 - 30, 380 ], name: '收入' },
        { year: '1952 年', value: 520, valueArray: [ 520 - 30, 520 ], name: '收入' },
        { year: '1956 年', value: 610, valueArray: [ 610 - 30, 610 ], name: '收入' },
        { year: '1957 年', value: 1450, valueArray: [ 1450 - 30, 1450 ], name: '收入' },
        { year: '1958 年', value: 480, valueArray: [ 480 - 30, 480 ], name: '收入' },
        { year: '1951 年', value: 38, valueArray: [ 38 - 30, 38 ], name: '支出' },
        { year: '1952 年', value: 52, valueArray: [ 52 - 30, 52 ], name: '支出' },
        { year: '1956 年', value: 61, valueArray: [ 61 - 30, 61 ], name: '支出' },
        { year: '1957 年', value: 145, valueArray: [ 145 - 30, 145 ], name: '支出' },
        { year: '1958 年', value: 48, valueArray: [ 48 - 30, 48 ], name: '支出' },
      ],
      chartType: 'Column',
      chartOpts: {},
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    chartDataUpdate(formData) {
      const { type, ...opts } = formData;

      this.chartType = type;
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
