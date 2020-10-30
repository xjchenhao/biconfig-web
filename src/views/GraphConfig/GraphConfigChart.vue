<template>
  <div
    ref="GraphConfigChart"
  />
</template>

<script>
import { Bar } from '@antv/g2plot';

export default {
  name: 'GraphConfigChart',
  props: {
  },
  data() {
    return {
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

    const bar = new Bar(graphConfigChartDom, {
      data: this.data,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
    });

    bar.render();

  },

};
</script>
