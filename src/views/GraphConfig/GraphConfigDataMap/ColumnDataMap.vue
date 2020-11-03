<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
      name="xField"
      label="X轴字段"
      required
    >
      <a-input
        v-model:value="form.xField"
        placeholder="请填写X轴字段"
      />
    </a-form-item>
    <a-form-item
      class="graphConfigForm-from-item"
      name="yField"
      label="Y轴字段"
      required
    >
      <a-input
        v-model:value="form.yField"
        placeholder="请填写Y轴字段"
      />
    </a-form-item>
    <a-form-item
      class="graphConfigForm-from-item"
      name="isGroup"
      label="是否分组柱形图"
    >
      <a-switch v-model:checked="formIsGroup" />
    </a-form-item>
    <a-form-item
      v-show="form.isGroup"
      class="graphConfigForm-from-item"
      name="seriesField"
      label="关联字段"
      required
    >
      <a-input
        v-model:value="form.seriesField"
        placeholder="请填写关联字段"
      />
    </a-form-item>
  </div>
</template>

<script>
import { Form, Input, Switch } from 'ant-design-vue';

export default {
  components: {
    aFormItem: Form.Item,
    aInput: Input,
    aSwitch: Switch,
  },
  emits: [ 'update' ],
  props: {
    basicForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      form: {
        xField: 'year',
        yField: 'value',
        isGroup: false,
        seriesField: '',
      },
    };
  },
  computed: {
    formIsGroup: {
      get() {
        return this.form.isGroup;
      },
      set(value) {
        this.form.seriesField = '';
        this.form.isGroup = value;
      },
    },
  },
  watch: {
    form: {
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
    handleUpdate() {
      this.$emit('update', this.form);
    },
  },

};
</script>

<style lang='less'>
@import './../index.less';
</style>
