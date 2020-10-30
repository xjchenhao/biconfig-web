<template>
  <div :style="tableLayoutStyle">
    <slot />
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  computed: {
    tableLayoutStyle() {
      return process.env.VUE_APP_TableLayoutStyle;
    },
  },

};
</script>
