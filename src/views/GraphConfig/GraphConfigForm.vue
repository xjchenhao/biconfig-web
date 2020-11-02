<template>
  <div>
    <a-form
      layout="vertical"
      :model="form"
    >
      <a-form-item
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
            条形图
          </a-select-option>
          <a-select-option value="Pie">
            饼状图
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
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
        name="yField"
        label="Y轴字段"
        required
      >
        <a-input
          v-model:value="form.yField"
          placeholder="请填写Y轴字段"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form, Input, Button, Select } from 'ant-design-vue';
export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  emits: [ 'update' ],
  data() {
    return {
      form: {
        type: 'Column',
        xField: 'year',
        yField: 'value',
      },
      // rules: {
      //   xField: [
      //     { required: true, message: 'Please input Activity name', trigger: 'change' },
      //   ],
      //   yField: [
      //     { required: true, message: 'Please input Activity name', trigger: 'change' },
      //   ],
      // },
    };
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

<style>

</style>
