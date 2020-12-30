<template>
  <div
    ref="viewChart"
  />
</template>

<script>
const G2plot = require('@antv/g2plot');

export default {
  name: 'ViewChart',
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
  watch: {
    data: {
      async handler() {
        await this.destroy();
        await this.render();
      },
      deep: true,
      immediate: false,
    },
  },
  computed: {
    chartOpts() {
      const attr = this.opts;
      const type = this.type;

      let optsFieldMap = {};

      if (type !== 'Pie') {
        optsFieldMap = {
          xField: attr.xField,
          yField: attr.yField,
          isGroup: attr.isGroup,
          isStack: attr.isStack,
          isRange: attr.isRange,
          isPercent: attr.isPercent,
          seriesField: attr.seriesField,
        };
      } else {
        optsFieldMap = {
          colorField: attr.colorField,
          angleField: attr.angleField,
        };
      }

      Object.keys(optsFieldMap).forEach(key => {
        if (optsFieldMap[key] === undefined) {
          delete optsFieldMap[type];
        }
      });

      return {
        ...optsFieldMap,
        meta: attr.meta,
        style: attr.style,
      };
    },
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const viewChartDom = this.$refs.viewChart;
      console.log('viewChartDom:', viewChartDom);

      const chartUri = this.uri;
      const chartType = this.type;
      const chartData = this.data;
      const chartOpts = this.chartOpts;

      console.log('-----渲染图表信息log start----');
      console.log('图表标识：', chartUri);
      console.log('图表类型：', chartType);
      console.log('图表数据：', chartData);
      console.log('图表参数：', JSON.stringify(chartOpts));
      console.log('-----渲染图表信息log end----');

      const context = new G2plot[chartType](viewChartDom, {
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
