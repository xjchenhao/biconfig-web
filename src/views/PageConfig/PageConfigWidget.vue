<template>
  <div class="pageConfigWidget">
    <div
      class="small"
      @click="addGraphContainer('small')"
    />
    <div
      class="medium"
      @click="addGraphContainer('medium')"
    />
    <div
      class="large"
      @click="addGraphContainer('large')"
    />
  </div>
</template>

<script>
import notification from 'ant-design-vue/es/notification';
export default {
  name: 'PageConfigWidget',
  methods: {
    addGraphContainer(size) {
      const isNotSet = this.$store.state.page.graphList.find(item => { return item.uri === ''; });
      if (isNotSet) {
        notification.warning({
          message: '请给已添加的组件进行设置',
        //   description: '请给已添加的组件进行设置',
        });
        return;
      }
      this.$store.dispatch('page/addGraph', { size });
    },
  },
};
</script>

<style lang="less" scoped>
@widgetFontStyle:{
    position: absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
.pageConfigWidget{
    align-items: flex-start;
    justify-content: center;
    display: flex;
    flex-direction: column;
    padding: 15px;
    box-sizing: border-box;
    .small,.medium,.large{
        position:relative;
        border-radius: 10px;
        margin-bottom: 10px;
        color:#fff;
        cursor: pointer;
    }
    .small{
        width:50%;
        padding-top:50%;
        background-color: #bab5d4;
        &::after{
            @widgetFontStyle();
            content:'小';
            font-size:24px;
        }
    }
    .medium{
        width: 100%;
        padding-top:50%;
        background-color:#dde9b7;
        &::after{
            @widgetFontStyle();
            content:'中';
            font-size:32px;
        }
    }
    .large{
        width: 100%;
        padding-top:100%;
        background-color: #9fdcbf;
        &::after{
            @widgetFontStyle();
            content:'大';
            font-size:42px;
        }
    }
}
</style>
