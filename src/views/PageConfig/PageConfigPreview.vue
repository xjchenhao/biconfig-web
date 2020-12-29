<template>
  <div>
    <div
      v-for="(item) in graphList"
      :key="item.uri"
      :class="item.size"
    >
      <h1
        v-if="item.titleShowType===1"
        class="title"
      >
        {{ item.title }}
      </h1>
      <!-- <graph-config-chart-filter
        class="filter"
        v-if="item.timeFilterShowType===1"
      /> -->
      <ViewChart
        class="chart"
        :data="item.data"
        :type="item.type"
        :uri="item.uri"
        :opts="item.opts"
      />
    </div>
  </div>
</template>

<script>
import ViewChart from '@/components/ViewChart';
export default {
  components: {
    ViewChart,
  },
  methods: {
    graphList() {

    },
  },

};
</script>

<style>

</style>
