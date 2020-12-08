<template>
  <div :style="basicsStyle">
    <router-view />
  </div>
</template>
<script>
import { replaceRequest } from '@/api/graph.js';

export default {
  computed: {
    basicsStyle() {
      return {
        width: '100%',
        height: '100%',
        ...process.env.VUE_APP_BasicsLayoutStyle,
      };
    },
  },
  mounted() {
    replaceRequest(this);
  },
};
</script>
