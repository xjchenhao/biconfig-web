<template>
  <div
    class="PageConfigView"
    :class="{empty:!graphList.length}"
  >
    <template v-if="graphList.length">
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
      </div>
    </template>
    <template v-else>
      <a-empty description="请点击左侧小组件添加图形组件进行配置" />
    </template>
  </div>
</template>

<script>
import request from '@/utils/request';
import { Empty } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';

export default {
  name: 'PageConfigView',
  components: {
    CloseOutlined,
    aEmpty: Empty,
  },
  data() {
    return {
      dataList: [],
      // current: '',
    };
  },
  computed: {
    current() {
      return this.$store.state.page.currentIndex;
    },
    request() {
      return this.$root.request || request;
    },
    graphList() {
      return this.$store.state.page.graphList;
    },
  },
  methods: {
    handleDeleteChart({ uri }, index) {
      this.dataList.splice(index, 1);
      this.$store.dispatch('page/deleteGraph', uri);
      this.$store.dispatch('page/setCurrentIndex', '');
    },
    handleSelect(index) {
      this.$store.dispatch('page/setCurrentIndex', index);
    },
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
    &.empty{
      justify-content: center;
      align-items: center;
      flex-basis: auto;
    }
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
