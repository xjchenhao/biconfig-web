<template>
  <a-form
    ref="form"
    layout="inline"
    :model="form"
  >
    <a-form-item
      label="名称"
      name="name"
    >
      <a-input
        v-model:value="form.name"
        placeholder="请输入图表名称"
      />
    </a-form-item>
    <a-form-item
      label="图表类型"
      name="type"
    >
      <a-select
        style="width:170px"
        v-model:value="form.type"
      >
        <a-select-option value="">
          全部
        </a-select-option>
        <a-select-option value="bar">
          柱形图
        </a-select-option>
        <a-select-option value="line">
          折线图
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item>
      <a-button
        type="primary"
        @click="handleSubmit"
      >
        查询
      </a-button>
      <a-button
        type="defult"
        style="margin-left: 10px;"
        @click="handleReset"
      >
        重置
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { Form, Input, Button, Select } from 'ant-design-vue';

export default {
  name: 'GraphQuery',
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  data() {
    return {
      form: {
        name: '',
        type: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formInline);
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style>

</style>
