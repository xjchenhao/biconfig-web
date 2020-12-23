<template>
  <div class="notSupport">
    无相关配置项
  </div>
</template>

<script>
export default {

  methods: {
    async initData() {
      await this.$store.dispatch('graph/setStyle', {});
    },
  },
};
</script>

<style lang="less" scoped>
.notSupport{
  padding:10px 20px 20px;
  font-size: 22px;
  color:#afafaf;
}
</style>
