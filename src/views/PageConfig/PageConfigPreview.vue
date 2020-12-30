<template>
  <div v-if="isLoding">
    页面渲染中，请稍等
  </div>
  <div v-else>
    <div class="main">
      <div
        v-for="(item,index) in previewData"
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
          <chart-filter
            class="filter"
            @update="({ startTime, endTime })=>{handleFilterUpdate(item,{ index,startTime, endTime })}"
            v-if="item.timeFilterShowType===1"
          />
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
  </div>
</template>

<script>
import request from '@/utils/request';
import ViewChart from '@/components/ViewChart';
import ChartFilter from '@/components/ChartFilter';
import { getView as getGraphView } from '@/api/graph';

export default {
  components: {
    ViewChart,
    ChartFilter,
  },
  data() {
    return {
      isLoding: true,
    };
  },
  computed: {
    request() {
      return this.$root.request || request;
    },
    previewData() {
      return this.$store.state.page.previewData;
    },
    graphList() {
      return this.$store.state.page.graphList;
    },
    prePreviewDataList() {
      const previewData = this.$store.state.page.previewData;
      const existUri = previewData.map(item => item.uri);
      const result = [];

      this.graphList.forEach(item => {
        if (!existUri.includes(item.uri)) {
          result.push(item);
        }
      });

      return result;
    },
  },
  watch: {
    '$store.state.page.isPreview': {
      async handler(value) {
        if (!value) {
          return;
        }

        this.isLoding = true;
        await this.getDataList();
        this.isLoding = false;
      },
      immediate: true,
    },
  },
  methods: {
    async handleFilterUpdate(item, { index, startTime, endTime }) {
      let { query } = this.$route.query;

      if (!query) {
        query = '{}';
      }

      const result = await this.getDataItem(item, {
        startTime,
        endTime,
        ...JSON.parse(query),
      });

      this.$store.dispatch('page/setPreviewDataItem', {
        index,
        value: result.data,
      });
    },
    async getDataItem(item, query = {}) {
      const res = await this.request(getGraphView({
        uri: item.uri,
        ...query,
      }));

      const { type, apiUrl, name, attr, timeFilterShowType, titleShowType } = res.data;

      const graphData = await this.request({
        url: apiUrl,
        method: 'get',
      });

      return {
        size: item.size,
        name,
        uri: item.uri,
        type,
        timeFilterShowType,
        titleShowType,
        apiUrl,
        data: Array.isArray(graphData.data) ? graphData.data : graphData.data.list,
        opts: attr,
      };
    },
    async getDataList() {
      const prePreviewDataList = this.prePreviewDataList;

      const result = await Promise.all(prePreviewDataList.map(item => this.getDataItem(item)));

      this.$store.dispatch('page/addPreviewData', result);
    },
  },

};
</script>

<style lang="less" scoped>
.main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: space-between;
    padding:15px;
}
.small,.medium,.large{
    position: relative;
    display:inline-block;
    border-radius: 10px;
    margin-bottom: 20px;
    color:#fff;
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
        padding:30px;
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
.filter{
    width: 100%;
    margin-bottom:30px;
}
</style>
