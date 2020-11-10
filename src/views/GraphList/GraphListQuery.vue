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
        <a-select-option
          :key="key"
          :value="key"
          v-for="(value, key) in supportGraphTypeMap"
        >
          {{ value }}
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
import { supportGraphTypeMap } from '@/utils/config';

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
  emits: [ 'get-data' ],
  data() {
    return {
      form: {
        name: '',
        type: '',
      },
    };
  },
  computed: {
    supportGraphTypeMap() {
      return supportGraphTypeMap;
    },
  },
  methods: {
    handleSubmit() {
      this.$emit('get-data', this.form);
    },
    handleReset() {
      this.$refs.form.resetFields();
      this.$emit('get-data', {});
    },
  },
};
</script>

<style>

</style>
