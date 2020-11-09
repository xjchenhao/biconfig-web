<template>
  <div>
    <a-button
      type="primary"
      @click="openConfigPage"
    >
      <aPlusOutlined
        class="GraphListToolbar-icon"
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
    openConfigPage() {
      this.$router.push('/graph/config');
    },
  },
};
</script>

<style lang='less'>
.GraphListToolbar{
  &-icon{
    font-size:14px;
  }
}
</style>
