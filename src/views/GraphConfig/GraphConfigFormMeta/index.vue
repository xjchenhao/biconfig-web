<template>
  <div class="graphConfigFormMeta">
    <div
      class="item"
      v-for="item in fieldList"
      :key="item"
    >
      <h4>{{ item }}轴配置</h4>
      <item />
    </div>
  </div>
</template>

<script>
import item from './item';
export default {
  components: {
    item,
  },

  props: {
    fieldList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.graphConfigFormMeta{
  .item+.item{
    margin-top:20px
  }
}
</style>
