<template>
  <div
    ref="pageConfigChart"
  />
</template>

<script>
const G2plot = require('@antv/g2plot');

export default {
  name: 'PageConfigChart',
  data() {
    return {
      context: null,
    };
  },
  props: {
    uri: {
      type: String,
      default() {
        return '';
      },
    },
    type: {
      type: String,
      default() {
        return '';
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    opts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const pageConfigChartDom = this.$refs.pageConfigChart;

      const chartUri = this.uri;
      const chartType = this.type;
      const chartData = this.data;
      const chartOpts = this.opts;

      console.log('-----渲染图表信息log start----');
      console.log('图表标识：', chartUri);
      console.log('图表类型：', chartType);
      console.log('图表数据：', chartData);
      console.log('图表参数：', JSON.stringify(chartOpts));
      console.log('-----渲染图表信息log end----');

      const context = new G2plot[chartType](pageConfigChartDom, {
        data: chartData,
        ...chartOpts,
      });

      this.context = context;

      context.render();
    },
    destroy() {
      this.context && this.context.destroy();
    },
  },

};
</script>
