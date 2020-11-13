<template>
  <div class="graphView">
    <a-page-header
      class="graphView-header"
      title="图表查看"
      sub-title="图表配置结果查看"
      v-if="!isInline"
      @back="handleBack"
    />
    <h1 v-if="timeFilterShowType">
      {{ title }}
    </h1>
    <graph-config-chart-filter
      :class="isInline?'graphView-filter_inline':'graphView-filter_view'"
      @update="handleFilterUpdate"
    />
    <graph-config-chart
      :class="isInline?'graphView-chart_inline':'graphView-chart_view'"
      ref="chart"
      :data="data"
      :type="type"
      :opts="opts"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { PageHeader } from 'ant-design-vue';
import { getView as getGraphView } from '@/api/graph';
import GraphConfigChart from './../GraphConfig/GraphConfigChart';
import GraphConfigChartFilter from './../GraphConfig/GraphConfigChartFilter';
import request from '@/utils/request';

export default {
  components: {
    aPageHeader: PageHeader,
    GraphConfigChart,
    GraphConfigChartFilter,
  },
  data() {
    return {
      api: '',
      title: '标题',
      data: [],
      type: 'Column',
      opts: {},
      timeFilterShowType: 0,
    };
  },
  computed: {
    currentId() {
      return this.$route.query.id;
    },
    isInline() {
      const { isInline } = this.$route.query;

      if (isInline === '0' || isInline === 'false' || isInline === undefined) {
        return false;
      }
      return true;
    },
  },
  beforeCreate() {
    document.querySelector('#app').classList.add('app-full');
  },
  beforeUnmount() {
    document.querySelector('#app').classList.remove('app-full');
  },
  async mounted() {

    const res = await getGraphView({
      id: this.currentId,
    });

    const { type, apiUrl, name, attr, timeFilterShowType } = res.data;

    // const graphData = await request({
    //   url: apiUrl,
    //   method: 'get',
    // });

    this.api = apiUrl;

    // this.data = graphData.data.list;
    this.title = name;
    this.type = type;
    this.timeFilterShowType = timeFilterShowType;
    this.opts = Object.assign({}, attr);

    // this.$refs.chart.render();

    await this.getDataAndRender({
      startTime: dayjs().startOf().valueOf(),
      endTime: dayjs().endOf().valueOf(),
    });
  },
  methods: {
    async getDataAndRender({ startTime, endTime }) {

      const graphData = await request({
        url: this.api,
        method: 'get',
        data: {
          startTime,
          endTime,
        },
      });

      this.data = graphData.data.list;

      this.$nextTick(() => {
        this.$refs.chart.destroy();
        this.$refs.chart.render();
      });
    },
    handleBack() {
      this.$router.go(-1);
    },
    async handleFilterUpdate(query) {
      await this.getDataAndRender(query);
    },
  },
};
</script>

<style lang="less" scoped>
.graphView{
    box-sizing: border-box;
    width:100%;
    height:100%;
    &-header{
        border-bottom: 1px solid rgb(235, 237, 240)
    }
    h1{
      margin:3% 0 1%;
      text-align:center;
    }
    &-filter_view{
        width:60%;
        margin:0 auto;
        margin-top:40px;
    }
    &-filter_inline{
        width:100%;
        margin-top:40px;
    }
    &-chart_view{
        margin:40px auto 0;
        width:60%;
        height:60%
    }
    &-chart_inline{
        margin:40px auto 0;
        width:100%;
        height:100%;
    }
}
</style>

<style lang="less">
.app-full{
    width:100%;
    height:100%
}
</style>
