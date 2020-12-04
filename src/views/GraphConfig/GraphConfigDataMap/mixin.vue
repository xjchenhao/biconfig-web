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
      const data = this.$store.state.data;
      const isEmpty = data === undefined || data.length === 0;

      return isEmpty ? [] : Object.keys(data[0]);
    },
    data() {
      return this.$store.state.data;
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
  },
  mounted() {
    this.handleUpdate();
  },
  methods: {
    initData(formData) {
      Object.keys(this.formRef).forEach(key => {
        this.formRef[key] = formData[key];
      });
    },
    handleUpdate() {
      this.$store.dispatch('setOptsFieldMap', this.formRef);
    },
  },

};
</script>
