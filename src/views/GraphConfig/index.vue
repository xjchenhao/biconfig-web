<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="配置规则"
      sub-title="条形图的规则配置"
      @back="() => null"
    />
    <a-layout style="flex-direction: row;">
      <a-layout-content style="flex:1">
        我是图表
      </a-layout-content>
      <a-layout-sider style="width:300px;height:calc(100vh - 66px);overflow: scroll;">
        我是配置菜单
      </a-layout-sider>
    </a-layout>
  </div>
</template>

<script>
import { PageHeader, Layout } from 'ant-design-vue';
export default {
  components: {
    aPageHeader: PageHeader,
    aLayout: Layout,
    aLayoutSider: Layout.sider,
    aLayoutContent: Layout.content,
  },
};
</script>

<style>

</style>
