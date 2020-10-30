<template>
  <div
    ref="GraphConfigChart"
  />
</template>

<script>
const G2plot = require('@antv/g2plot');

export default {
  name: 'GraphConfigChart',
  props: {
    opts: {
      type: Object,
      default() {
        return {
          type: 'Column',
        };
      },
    },
  },
  data() {
    return {
      bar: null,
      data: [
        { year: '1951 年', value: 38 },
        { year: '1952 年', value: 52 },
        { year: '1956 年', value: 61 },
        { year: '1957 年', value: 145 },
        { year: '1958 年', value: 48 },
      ],
    };
  },
  mounted() {
    this.render();
  },
  methods: {
    render() {
      const graphConfigChartDom = this.$refs.GraphConfigChart;
      const chartType = this.opts.type;

      const bar = new G2plot[chartType](graphConfigChartDom, {
        data: this.data,
        xField: 'year',
        yField: 'value',
      });
      this.bar = bar;

      bar.render();
    },
    destroy() {
      console.log(this.bar);
      this.bar.destroy();
    },
  },

};
</script>
