<template>
  <div
    ref="GraphConfigChart"
    :title="JSON.stringify(opts)"
  />
</template>

<script>
const G2plot = require('@antv/g2plot');

export default {
  name: 'GraphConfigChart',
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: String,
      default: 'Column',
    },
    opts: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      bar: null,
    };
  },
  watch: {
    type() {
      this.destroy();
      this.render();
    },
    opts: {
      handler() {
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
      const { xField, yField } = this.opts;

      const bar = new G2plot[chartType](graphConfigChartDom, {
        data: this.data,
        xField,
        yField,
        meta: {
          year: {
            alias: '时间',
          },
          value: {
            alias: '销售额',
          },
        },
      });
      this.bar = bar;

      bar.render();
    },
    destroy() {
      this.bar && this.bar.destroy();
    },
  },

};
</script>
