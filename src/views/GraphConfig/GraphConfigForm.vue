<template>
  <div>
    <a-form
      layout="vertical"
      :model="form"
    >
      <a-form-item label="表单类型">
        <a-select
          style="width:170px"
          v-model:value="form.type"
          @change="handleUpdate"
        >
          <a-select-option value="Column">
            柱形图
          </a-select-option>
          <a-select-option value="Line">
            折线图
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Field B">
        <a-input
          v-model:value="form.fieldB"
          placeholder="input placeholder"
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
      },
    };
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
