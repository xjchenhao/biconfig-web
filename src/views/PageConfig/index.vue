<template>
  <div id="pageConfig">
    <a-page-header
      class="pageConfig-header"
      title="页面配置"
      sub-title="页面展示配置"
      @back="handleBack"
    >
      <template #extra>
        <a-button @click="previewVisible=true">
          <aEyeOutlined />&nbsp;预览
        </a-button>
      </template>
    </a-page-header>
    <a-layout class="pageConfig-layout">
      <a-layout-sider class="sider-left">
        <page-config-widget />
      </a-layout-sider>
      <a-layout-content
        class="main"
      >
        <page-config-view />
      </a-layout-content>
      <a-layout-sider class="sider-right">
        <PageConfigForm />
      </a-layout-sider>
    </a-layout>
  </div>
  <a-drawer
    placement="right"
    width="100%"
    :closable="false"
    :visible="previewVisible"
    :after-visible-change="afterVisibleChange"
  >
    <template #title>
      <a-row
        justify="space-between"
        align="middle"
      >
        <a-col :span="8">
          页面预览
        </a-col>
        <a-col
          :span="8"
          style="text-align:right"
        >
          <a-button @click="previewVisible=false">
            <aEyeInvisibleOutlined />&nbsp;配置
          </a-button>
        </a-col>
      </a-row>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-drawer>
</template>

<script>
import { PageHeader, Layout, Button, Drawer, Row, Col } from 'ant-design-vue';
import PageConfigWidget from './PageConfigWidget';
import PageConfigView from './PageConfigView';
import PageConfigForm from './PageConfigForm';
import { EyeInvisibleOutlined } from '@ant-design/icons-vue';

export default {
  name: 'PageConfig',
  components: {
    aPageHeader: PageHeader,
    aLayout: Layout,
    aLayoutSider: Layout.sider,
    aLayoutContent: Layout.content,
    aButton: Button,
    aDrawer: Drawer,
    aRow: Row,
    aCol: Col,
    aEyeInvisibleOutlined: EyeInvisibleOutlined,
    PageConfigWidget,
    PageConfigView,
    PageConfigForm,
  },
  data() {
    return {
      previewVisible: false,
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
  .main,.sider-left,.sider-right{
    height:calc(100% - 66px);
    overflow-y: scroll;
    box-sizing: border-box;
  }
  .main{
    flex:1;
    align-items: flex-start;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
  }
  .sider-left{
    width:20%;
    border-right:1px solid rgb(235, 237, 240);
  }
  .sider-right{
    width:30%;
    border-left:1px solid rgb(235, 237, 240);
  }
}
</style>
