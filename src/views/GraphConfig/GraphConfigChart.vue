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
      // type: 'Column',
      // data: [],
      // opts: {},
      context: null,
    };
  },
  computed: {
    isRenderLock() {
      return this.$store.state.isRenderLock;
    },
  },
  watch: {
    '$store.state.isRenderLock': async function(value) {
      if (!value) {
        await this.update();
      }
    },
    '$store.state.data': async function() {
      await this.update();
    },
    '$store.state.type': async function() {
      await this.update();
    },
    '$store.state.opts': {
      async handler() {
        await this.update();
      },
      deep: true,
      immediate: false,
    },
  },
  methods: {
    async update() {
      if (this.isRenderLock) {
        return;
      }
      await this.destroy();
      await this.render();
    },
    async render() {
      const graphConfigChartDom = this.$refs.GraphConfigChart;

      const chartType = this.$store.state.type;
      const chartData = this.$store.state.data;
      const chartOpts = await this.$store.dispatch('getGraphConfig');

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
