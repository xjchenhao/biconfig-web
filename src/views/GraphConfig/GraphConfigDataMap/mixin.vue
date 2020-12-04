<script>
import { Form } from 'ant-design-vue';

export default {
  emits: [ 'update' ],
  components: {
    aFormItem: Form.Item,
  },
  props: {
    // isModify: {
    //   type: Boolean,
    //   default: false,
    // },
    // formData: {
    //   type: Object,
    //   default() {
    //     return {};
    //   },
    // },
    validateInfos: {
      type: Object,
      default() {
        return {};
      },
    },
    // data: {
    //   type: Array,
    //   default() {
    //     return [];
    //   },
    // },
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
      if (formData) {
        Object.keys(this.formRef).forEach(key => {
          this.formRef[key] = formData[key];
        });
      }
    },
    handleUpdate() {
      // this.$emit('update', this.formRef);
      this.$store.dispatch('setOptsFieldMap', this.formRef);
    },
  },

};
</script>
