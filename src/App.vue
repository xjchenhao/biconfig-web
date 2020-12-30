<template>
  <a-config-provider :locale="locale">
    <div :style="basicsStyle">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  components: {
    aConfigProvider: ConfigProvider,
  },
  data() {
    return {
      locale: zhCN,
    };
  },
  computed: {
    basicsStyle() {
      return {
        width: '100%',
        height: '100%',
        ...process.env.VUE_APP_BasicsLayoutStyle,
      };
    },
  },
};
</script>
