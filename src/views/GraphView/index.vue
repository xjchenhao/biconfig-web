<template>
  <div class="graphView">
    <a-page-header
      class="graphView-header"
      title="图表查看"
      sub-title="图表配置结果查看"
      v-if="!isInline"
      @back="handleBack"
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
import { PageHeader } from 'ant-design-vue';
import { getView as getGraphView } from '@/api/graph';
import GraphConfigChart from './../GraphConfig/GraphConfigChart';
import request from '@/utils/request';

export default {
  components: {
    aPageHeader: PageHeader,
    GraphConfigChart,
  },
  data() {
    return {
      title: '标题',
      data: [],
      type: 'Column',
      opts: {},
    };
  },
  computed: {
    currentId() {
      return this.$route.query.id;
    },
    isInline() {
      const { isInline } = this.$route.query;

      if (isInline === '0' || isInline === 'false') {
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

    const { type, apiUrl, name, attr } = res.data;

    const graphData = await request({
      url: apiUrl,
      method: 'get',
    });

    this.data = graphData.data.list;
    this.title = name;
    this.type = type;
    this.opts = Object.assign({}, attr);

    this.$refs.chart.render();
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
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
    &-chart_view{
        margin:10vw auto 0;
        width:60vw;
        height:60vw
    }
    &-chart_inline{
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
