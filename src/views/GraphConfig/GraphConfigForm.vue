<template>
  <div>
    <a-form
      layout="vertical"
      :model="form"
    >
      <h2>基本信息</h2>
      <a-form-item
        class="graphConfigForm-from-item"
        name="type"
        label="表单类型"
        required
      >
        <a-select
          style="width:170px"
          v-model:value="form.type"
        >
          <a-select-option value="Column">
            柱形图
          </a-select-option>
          <a-select-option value="Line">
            折线图
          </a-select-option>
          <a-select-option value="Bar">
            柱状图
          </a-select-option>
          <a-select-option value="Pie">
            饼状图
          </a-select-option>
        </a-select>
      </a-form-item>
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
      <a-divider />
      <h2>图形样式</h2>
      <graph-config-style-type-of-column @update="handleStyleUpdate" />
      <a-form-item
        class="graphConfigForm-from-item"
      >
        <a-button type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
    {{ formStyle }}
  </div>
</template>

<script>
import GraphConfigStyleTypeOfColumn from './GraphConfigStyleType/Column';
import { Form, Input, Button, Select, Divider } from 'ant-design-vue';
export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aSelect: Select,
    aSelectOption: Select.Option,
    aDivider: Divider,
    GraphConfigStyleTypeOfColumn,
  },
  emits: [ 'update' ],
  data() {
    return {
      form: {
        type: 'Column',
        xField: 'year',
        yField: 'value',
      },
      styleForm: {

      },
    };
  },
  computed: {
    formStyle: {
      get() {
        return JSON.stringify(this.form.columnStyle);
      },
      set(val) {
        this.form.columnStyle = JSON.parse(val);
      },
    },
  },
  watch: {
    form: {
      handler() {
        this.handleFormUpdate();
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {
    this.handleFormUpdate();
  },
  methods: {
    handleStyleUpdate(value) {
      this.styleForm = value;
      this.handleFormUpdate();
    },
    handleFormUpdate() {
      this.$emit('update', {
        ...this.form,
        ...this.styleForm,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.graphConfigForm{
  &-from-item{
    margin-bottom:0;
  }
}
</style>
