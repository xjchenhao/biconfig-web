<template>
  <div v-if="isLoding">
    页面渲染中，请稍等
  </div>
  <div v-else>
    <div
      v-for="(item) in dataList"
      :key="item.uri"
      :class="item.size"
    >
      <div class="content">
        <h2
          v-if="item.titleShowType===1"
          class="title"
        >
          {{ item.name }}
        </h2>
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
  </div>
</template>

<script>
import request from '@/utils/request';
import ViewChart from '@/components/ViewChart';
import { getView as getGraphView } from '@/api/graph';

export default {
  components: {
    ViewChart,
  },
  data() {
    return {
      dataList: [],
      isLoding: true,
    };
  },
  computed: {
    request() {
      return this.$root.request || request;
    },
    graphList() {
      return this.$store.state.page.graphList;
    },
  },
  watch: {
    '$store.state.page.isPreview': async function(value) {
      if (!value) {
        return;
      }

      this.isLoding = true;
      await this.getDataList();
      this.isLoding = false;
    },
  },
  methods: {
    async getDataList() {
      const graphList = this.graphList;
      const result = [];

      for (let i = 0, l = graphList.length; i < l; i++) {
        const item = graphList[i];

        const res = await this.request(getGraphView({
          uri: item.uri,
        }));

        const { type, apiUrl, name, attr, timeFilterShowType, titleShowType } = res.data;

        const graphData = await this.request({
          url: apiUrl,
          method: 'get',
        });

        result.push({
          size: item.size,
          name,
          uri: item.uri,
          type,
          timeFilterShowType,
          titleShowType,
          apiUrl,
          data: Array.isArray(graphData.data) ? graphData.data : graphData.data.list,
          opts: attr,
        });

      }

      this.dataList = result;
    },
  },

};
</script>

<style lang="less" scoped>
.small,.medium,.large{
    position: relative;
    display:inline-block;
    border-radius: 10px;
    margin-bottom: 10px;
    color:#fff;
    cursor: pointer;
    overflow: hidden;
    .content{
        position: absolute;
        left:0;
        top:0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width:100%;
        height:100%;
        padding:15px;
        box-sizing: border-box;
    }
}
.small{
    width:calc(50% - 5px);
    padding-bottom:calc(50% - 5px);
    font-size:24px;
}
.medium{
    width: 100%;
    padding-bottom:calc(50% - 5px);
    font-size:32px;
}
.large{
    width: 100%;
    padding-bottom:100%;
    font-size:42px;
}
.title{
    font-size:100%;
}
.chart{
    width: 100%;
    height: 100%;
}
</style>
