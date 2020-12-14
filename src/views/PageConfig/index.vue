<template>
  <div id="pageConfig">
    <a-page-header
      class="pageConfig-header"
      title="页面配置"
      sub-title="页面展示配置"
      @back="handleBack"
    />
    <a-layout class="pageConfig-layout">
      <a-layout-sider class="sider-left">
        34
      </a-layout-sider>
      <a-layout-content
        class="main"
      >
        123
      </a-layout-content>
      <a-layout-sider class="sider-right">
        34
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import { PageHeader, Layout } from 'ant-design-vue';

export default {
  name: 'PageConfig',
  components: {
    aPageHeader: PageHeader,
    aLayout: Layout,
    aLayoutSider: Layout.sider,
    aLayoutContent: Layout.content,
  },
  data() {
    return {

    };
  },
  watch: {

  },
  methods: {
    handleBack() {
      this.$router.push('/page');
    },
  },
};
</script>

<style lang="less" scoped>
#pageConfig{
  height: 100%;
}
.pageConfig-header{
  border-bottom: 1px solid rgb(235, 237, 240)
}
.pageConfig-layout{
  flex-direction: row;
  background-color:#fff;
  height:100%;
  .main{
    flex:1;
    align-items: flex-start;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
  }
  .sider-left,.sider-right{
    width:25%;
    height:calc(100% - 66px);
    overflow: scroll;
    box-sizing: border-box;
  }
  .sider-left{
    border-right:1px solid rgb(235, 237, 240);
  }
  .sider-right{
    border-left:1px solid rgb(235, 237, 240);
  }
}
</style>
