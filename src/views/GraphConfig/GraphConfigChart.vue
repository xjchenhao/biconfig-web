<template>
  <div
    ref="GraphConfigChart"
  />
</template>

<script>
const G2plot = require('@antv/g2plot');

export default {
  name: 'GraphConfigChart',
  data() {
    return {
      type: 'Column',
      data: [],
      opts: {},
      context: null,
    };
  },
  watch: {
    '$store.state.data': function(value) {
      this.data = value;
      this.destroy();
      this.render();
    },
    '$store.state.type': async function(value) {
      this.type = value;
      this.destroy();
      this.render();
    },
    '$store.state.opts': {
      async handler() {
        this.opts = await this.$store.dispatch('getGraphConfig');

        this.destroy();
        this.render();
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    render() {
      const graphConfigChartDom = this.$refs.GraphConfigChart;
      const chartType = this.type;
      const chartOpts = this.opts;
      const chartData = this.data;

      console.log('-----渲染图表信息log start----');
      console.log('图表类型：', chartType);
      console.log('图表数据：', chartData);
      console.log('图表参数：', JSON.stringify(chartOpts));
      console.log('-----渲染图表信息log end----');

      const context = new G2plot[chartType](graphConfigChartDom, {
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
