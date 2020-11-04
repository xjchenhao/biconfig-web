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
      label="柱形图类型"
      required
    >
      <a-select
        style="width:170px"
        v-model:value="graphType"
        @change="renderGraph"
      >
        <a-select-option value="">
          基础柱形图
        </a-select-option>
        <a-select-option value="Group">
          分组柱形图
        </a-select-option>
        <a-select-option value="Stack">
          堆积柱状图
        </a-select-option>
        <a-select-option value="Range">
          区间柱状图
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      v-show="form.isStack"
      class="graphConfigForm-from-item"
      name="isPercent"
      label="是否百分百柱状图"
    >
      <a-switch v-model:checked="form.isPercent" />
    </a-form-item>
    <a-form-item
      v-show="isShowSeriesField"
      class="graphConfigForm-from-item"
      name="seriesField"
      label="关联字段"
      :required="isShowSeriesField"
    >
      <a-input
        v-model:value="form.seriesField"
        placeholder="请填写关联字段"
      />
    </a-form-item>
  </div>
</template>

<script>
import { Form, Input, Switch, Select } from 'ant-design-vue';

export default {
  components: {
    aFormItem: Form.Item,
    aInput: Input,
    aSwitch: Switch,
    aSelect: Select,
    aSelectOption: Select.Option,
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
        isStack: false,
        isRange: false,
        isPercent: false,
        seriesField: '',
      },
    };
  },
  computed: {
    graphType: {
      get() {
        if (this.form.isGroup) {
          return 'Group';
        }
        if (this.form.isStack) {
          return 'Stack';
        }
        if (this.form.isRange) {
          return 'Range';
        }
        return '';
      },
      set(type) {
        this.form.isGroup = false;
        this.form.isStack = false;
        this.form.isRange = false;

        if (type !== 'Stack') {
          this.form.isPercent = false;
        }

        this.form[`is${type}`] = true;
      },
    },
    isShowSeriesField() {
      return this.form.isGroup || this.form.isStack;
    },
    formIsGroup: {
      get() {
        return this.form.isGroup;
      },
      set(value) {

        if (!this.isShowSeriesField) {
          this.form.seriesField = '';
        }
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
