<script>
import { Form } from 'ant-design-vue';

export default {
  emits: [ 'update' ],
  components: {
    aFormItem: Form.Item,
  },
  props: {
    isModify: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
    validateInfos: {
      type: Object,
      default() {
        return {};
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    // 字段列表
    fieldList() {
      return Object.keys(this.data[0]);
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
      if (this.isModify && formData) {
        Object.keys(this.formRef).forEach(key => {
          this.formRef[key] = formData[key];
        });
      }
    },
    handleUpdate() {
      this.$emit('update', this.formRef);
    },
  },

};
</script>
