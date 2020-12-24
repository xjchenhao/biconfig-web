<template>
  <div class="PageConfigView">
    <div
      v-for="(item,index) in graphList"
      @click="handleSelect(index)"
      :key="item.uri"
      :class="[item.size,{active:current===index}]"
    >
      <div class="content">
        <div v-if="item.uri">
          <p><b>已设置</b></p>
          <p><small>关联图形：{{ item.uri }}</small></p>
        </div>
        <div v-else>
          <p><b>未设置</b></p>
          <p><small>点我进行设置</small></p>
        </div>
        <div
          class="deleteChartBtn"
          title="删除该图形"
          @click.stop="handleDeleteChart(item,index)"
        >
          <CloseOutlined />
        </div>
      </div>
      <!-- <div>
        <h1
          v-if="item.titleShowType===1"
          class="title"
        >
          {{ item.title }}
        </h1>
        <graph-config-chart-filter
          class="filter"
          v-if="item.timeFilterShowType===1"
        />
        <PageConfigViewChart
          class="chart"
          :data="item.data"
          :type="item.type"
          :uri="item.uri"
          :opts="item.opts"
        />
      </div> -->
    </div>
    <!-- <div
      v-for="item in dataList"
      :key="item.uri"
    >
      {{ item.uri }}
      {{ item.data }}
      {{ item.type }}
      {{ item.uri }}
      {{ item.opts }}
    </div> -->
  </div>
</template>

<script>
// import PageConfigViewChart from './PageConfigViewChart';
// import GraphConfigChartFilter from './../GraphConfig/GraphConfigChartFilter';
import request from '@/utils/request';
// import { getView as getGraphView } from '@/api/graph';
import { CloseOutlined } from '@ant-design/icons-vue';

export default {
  name: 'PageConfigView',
  components: {
    // PageConfigViewChart,
    // GraphConfigChartFilter,
    CloseOutlined,
  },
  data() {
    return {
      dataList: [],
      current: '',
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
  // watch: {
  //   '$store.state.page.graphList': async function(newVal, oldVal) {
  //     if (newVal.length < oldVal.length) {
  //       return;
  //     }
  //     await this.getDataList(newVal);
  //   },
  // },
  async mounted() {
    // await this.getDataList(this.graphList);
  },
  methods: {
    handleDeleteChart({ uri }, index) {
      this.current = '';
      this.dataList.splice(index, 1);
      this.$store.dispatch('page/deleteGraph', uri);
    },
    handleSelect(index) {
      this.current = index;
    },
    // async getDataList(graphList) {
    //   const result = [];
    //   for (let i = 0, l = graphList.length; i < l; i++) {
    //     const item = graphList[i];

    //     const res = await this.request(getGraphView({
    //       id: item.id,
    //       uri: item.uri,
    //     }));

    //     const { type, apiUrl, name, attr, timeFilterShowType, titleShowType } = res.data;

    //     const graphData = await this.request({
    //       url: apiUrl,
    //       method: 'get',
    //     });

    //     let optsFieldMap = {};

    //     if (type !== 'Pie') {
    //       optsFieldMap = {
    //         xField: attr.xField,
    //         yField: attr.yField,
    //         isGroup: attr.isGroup,
    //         isStack: attr.isStack,
    //         isRange: attr.isRange,
    //         isPercent: attr.isPercent,
    //         seriesField: attr.seriesField,
    //       };
    //     } else {
    //       optsFieldMap = {
    //         colorField: attr.colorField,
    //         angleField: attr.angleField,
    //       };
    //     }

    //     Object.keys(optsFieldMap).forEach(key => {
    //       if (optsFieldMap[key] === undefined) {
    //         delete optsFieldMap[type];
    //       }
    //     });

    //     console.log(998877);
    //     result.push({
    //       size: item.size,
    //       name,
    //       uri: item.uri,
    //       type,
    //       timeFilterShowType,
    //       titleShowType,
    //       apiUrl,
    //       data: Array.isArray(graphData.data) ? graphData.data : graphData.data.list,
    //       opts: {
    //         ...optsFieldMap,
    //         meta: attr.meta,
    //         style: attr.style,
    //       },
    //     });

    //   }
    //   //   await graphList.forEach(async item => {});

    //   console.log(result);
    //   this.dataList = result;
    // },
  },
};
</script>

<style lang="less" scoped>
.PageConfigView{
    box-sizing: border-box;
    width:100%;
    height:100%;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    box-sizing: border-box;
    justify-content:space-between;
    flex-basis: 0;
    padding:15px;
    .header{
        border-bottom: 1px solid rgb(235, 237, 240)
    }
    h1{
      margin:3% 0 1%;
      text-align:center;
    }
    .filter_view{
        width:60%;
        margin:0 auto;
        margin-top:40px;
    }
    .chart{
        flex:1
    }
    .filter{
        height:70px;
    }

    .small,.medium,.large{
        position: relative;
        display:inline-block;
        border-radius: 10px;
        margin-bottom: 10px;
        color:#fff;
        cursor: pointer;
        overflow: hidden;
        &.active{
          border: 5px solid #fb5e5e;
        }
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
            p{
                margin:0
            }
            .deleteChartBtn{
                position:absolute;
                right:-60px;
                top:-60px;
                width:120px;
                height:120px;
                box-sizing: border-box;
                padding:25px;
                background-color: rgb(251, 94, 94);
                border-radius: 100%;
                display: flex;
                align-items: flex-end;
                justify-content: start;
                font-size:24px;
            }
        }
    }
    .small{
        width:calc(50% - 5px);
        padding-bottom:calc(50% - 5px);
        background-color: #bab5d4;
        font-size:24px;
        &.active{
          width:calc(50% - 10px);
          padding-bottom:calc(50% - 10px);
        }
    }
    .medium{
        width: 100%;
        padding-bottom:calc(50% - 5px);
        background-color:#dde9b7;
        font-size:32px;
    }
    .large{
        width: 100%;
        padding-bottom:100%;
        background-color: #9fdcbf;
        font-size:42px;
    }
}
</style>
