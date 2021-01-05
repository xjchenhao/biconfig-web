<template>
  <div id="pageConfig">
    <a-page-header
      class="pageConfig-header"
      title="页面配置"
      sub-title="页面展示配置"
      @back="handleBack"
    >
      <template #extra>
        <a-button @click="handleChangePreview(true)">
          <aEyeOutlined />&nbsp;预览
        </a-button>
        <a-button
          type="primary"
          @click="handleSubmit(true)"
        >
          <aCheckOutlined />&nbsp;完成
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
    :visible="isPreview"
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
          <a-button @click="handleChangePreview(false)">
            <aEyeInvisibleOutlined />&nbsp;点此返回页面配置
          </a-button>
        </a-col>
      </a-row>
    </template>
    <PageConfigPreview />
  </a-drawer>
</template>

<script>
import { PageHeader, Layout, Button, Drawer, Row, Col } from 'ant-design-vue';
import PageConfigWidget from './PageConfigWidget';
import PageConfigView from './PageConfigView';
import PageConfigForm from './PageConfigForm';
import PageConfigPreview from './PageConfigPreview';
import { EyeOutlined, EyeInvisibleOutlined, CheckOutlined } from '@ant-design/icons-vue';
import request from '@/utils/request';
import { create as createPage } from '@/api/page';

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
    aEyeOutlined: EyeOutlined,
    aEyeInvisibleOutlined: EyeInvisibleOutlined,
    aCheckOutlined: CheckOutlined,
    PageConfigWidget,
    PageConfigView,
    PageConfigForm,
    PageConfigPreview,
  },
  computed: {
    request() {
      return this.$root.request || request;
    },
    isPreview() {
      return this.$store.state.page.isPreview;
    },
  },
  unmounted() {
    this.$store.dispatch('page/init');
  },
  methods: {
    handleBack() {
      this.$router.push('/page');
    },
    async handleChangePreview(value) {
      await this.$store.dispatch('page/setPreview', value);
    },
    async handleSubmit() {
      const { pageName, graphList } = this.$store.state.page;
      const res = await this.request(createPage({
        name: pageName,
        graphList,
      }));
      console.log(res);
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
