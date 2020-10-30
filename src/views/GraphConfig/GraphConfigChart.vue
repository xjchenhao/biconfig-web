<template>
  <div
    ref="GraphConfigChart"
  />
</template>

<script>
const G2plot = require('@antv/g2plot');

console.dir(G2plot);

export default {
  name: 'GraphConfigChart',
  data() {
    return {
      type: 'Column',
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
    const graphConfigChartDom = this.$refs.GraphConfigChart;
    const chartType = this.type;

    const bar = new G2plot[chartType](graphConfigChartDom, {
      data: this.data,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
    });

    bar.render();

  },

};
</script>
