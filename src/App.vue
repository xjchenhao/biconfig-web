<template>
  <div :style="basicsStyle">
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    basicsStyle() {
      return process.env.VUE_APP_BasicsLayoutStyle;
    },
  },
};
</script>
