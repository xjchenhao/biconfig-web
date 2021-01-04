<template>
  <div>
    <a-button
      type="primary"
      @click="gotoConfigPage"
    >
      <aPlusOutlined
        class="PageListToolbar-icon"
      />&nbsp;添加
    </a-button>
  </div>
</template>

<script>
import { Button } from 'ant-design-vue';
import { PlusOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    aButton: Button,
    aPlusOutlined: PlusOutlined,
  },
  data() {
    return {
    };
  },
  methods: {
    gotoConfigPage() {
      this.$router.push('/page/config');
    },
  },
};
</script>

<style lang='less'>
.PageListToolbar{
  &-icon{
    font-size:14px;
  }
}
</style>
