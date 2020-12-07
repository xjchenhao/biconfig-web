<template>
  <div class="graphView">
    <a-page-header
      class="header"
      title="图表查看"
      sub-title="图表配置结果查看"
      v-if="!isInline"
      @back="handleBack"
    />
    <h1
      v-if="titleShowType===1"
      class="title"
    >
      {{ title }}
    </h1>
    <graph-config-chart-filter
      v-if="timeFilterShowType===1"
      :class="isInline?'filter_inline':'filter_view'"
      @update="handleFilterUpdate"
    />
    <graph-config-chart
      :class="isInline?'chart_inline':'chart_view'"
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
  computed: {
    isInline() {
      const { isInline } = this.$route.query;

      if (isInline === '0' || isInline === 'false' || isInline === undefined) {
        return false;
      }
      return true;
    },
    api() {
      return this.$store.state.apiUrl;
    },
    title() {
      return this.$store.state.name;
    },
    data() {
      return this.$store.state.data;
    },
    type() {
      return this.$store.state.type;
    },
    titleShowType() {
      return this.$store.state.titleShowType;
    },
    timeFilterShowType() {
      return this.$store.state.timeFilterShowType;
    },
  },
  watch: {
    async opts() {
      return await this.$store.dispatch('getGraphConfig');
    },
  },
  beforeCreate() {
    document.querySelector('#biApp').classList.add('app-full');
  },
  beforeUnmount() {
    document.querySelector('#biApp').classList.remove('app-full');
  },
  async mounted() {
    const { id, uri } = this.$route.query;

    const res = await getGraphView({
      id,
      uri,
    });

    const { type, apiUrl, name, attr, timeFilterShowType, titleShowType } = res.data;

    const graphData = await request({
      url: apiUrl,
      method: 'get',
    });

    this.$store.dispatch('setBasicForm', {
      name,
      uri,
      type,
      timeFilterShowType,
      titleShowType,
      apiUrl,
    });

    const optsFieldMap = {
      xField: attr.xField,
      yField: attr.yField,
      isGroup: attr.isGroup,
      isStack: attr.isStack,
      isRange: attr.isRange,
      isPercent: attr.isPercent,
      seriesField: attr.seriesField,
    };

    Object.keys(optsFieldMap).forEach(key => {
      if (optsFieldMap[key] === undefined) {
        delete optsFieldMap[type];
      }
    });

    this.$store.dispatch('setOptsMeta', attr.meta);
    this.$store.dispatch('setStyle', attr.style);
    this.$store.dispatch('setOptsFieldMap', optsFieldMap);
    this.$store.dispatch('setData', Array.isArray(graphData.data) ? graphData.data : graphData.data.list);

    await this.getDataAndRender({
      startTime: dayjs().startOf().valueOf(),
      endTime: dayjs().endOf().valueOf(),
    });
  },
  methods: {
    async getDataAndRender({ startTime, endTime }) {

      let { query } = this.$route.query;

      if (!query) {
        query = '{}';
      }

      const graphData = await request({
        url: this.api,
        method: 'get',
        params: {
          startTime,
          endTime,
          ...JSON.parse(query),
        },
      });

      // this.data = graphData.data.list;
      this.$store.dispatch('setData', Array.isArray(graphData.data) ? graphData.data : graphData.data.list);

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
    display:flex;
    flex-direction:column;
    .header{
        border-bottom: 1px solid rgb(235, 237, 240)
    }
    h1{
      margin:3% 0 1%;
      text-align:center;
    }
    .filter_view{
        width:60%;
        margin:0 auto;
        margin-top:40px;
    }
    .filter_inline{
        height:100px;
        margin-top:40px;
    }
    .chart_view{
        margin:40px auto 0;
        width:60%;
        height:60%
    }
    .chart_inline{
        flex:1;
        margin:40px auto 0;
        width:100%;
    }
}
</style>

<style lang="less">
.app-full{
    width:100%;
    height:100%
}
</style>
