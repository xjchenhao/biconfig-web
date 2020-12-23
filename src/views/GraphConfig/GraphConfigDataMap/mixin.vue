<script>
import { Form } from 'ant-design-vue';

export default {
  emits: [ 'update' ],
  components: {
    aFormItem: Form.Item,
  },
  props: {
    validateInfos: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    fieldList() {
      const data = this.$store.state.graph.data;
      const isEmpty = data === undefined || data.length === 0;

      return isEmpty ? [] : Object.keys(data[0]);
    },
    data() {
      return this.$store.state.graph.data;
    },
  },
  watch: {
    formRef: {
      handler() {
        this.handleUpdate();
      },
      deep: true,
      immediate: false,
    },
    '$store.state.graph.data': async function() {
      if (this.$store.state.graph.isRenderLock) {
        return;
      }
      await this.initDefaultSetting();
    },
  },
  // async mounted() {
  //   if (!this.$route.query.id && this.$store.state.graph.data.length === 0) {
  //     return;
  //   }

  //   // await this.$store.dispatch('graph/setRenderLock', true);
  //   await this.initDefaultSetting();
  //   // await this.$store.dispatch('graph/setRenderLock', false);
  // },
  methods: {
    initData(formData) {
      Object.keys(this.formRef).forEach(key => {
        this.formRef[key] = formData[key];
      });
    },
    handleUpdate() {
      this.$store.dispatch('graph/setOptsFieldMap', this.formRef);
    },
  },

};
</script>
