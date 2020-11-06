<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
      v-bind="validateInfos.colorField"
      label="分类字段"
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.colorField"
        @change="renderGraph"
        placeholder="请选择"
      >
        <a-select-option
          v-for="item in fieldList"
          :value="item"
          :key="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item
      class="graphConfigForm-from-item"
      v-bind="validateInfos.angleField"
      label="面积字段"
      required
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.angleField"
        @change="renderGraph"
        placeholder="请选择"
      >
        <a-select-option
          v-for="item in fieldList"
          :value="item"
          :key="item"
        >
          {{ item }}
        </a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { Select } from 'ant-design-vue';
import MixinItem from './mixin';

export default {
  mixins: [ MixinItem ],
  components: {
    aSelect: Select,
    aSelectOption: Select.Option,
  },

  setup() {
    const formRef = reactive({
      angleField: 'value',
      colorField: 'year',
    });

    const { resetFields, validate, validateInfos } = useForm(
      formRef,
      reactive({
        angleField: [
          { required: true, message: '请选择面积字段', trigger: 'change' },
        ],
        colorField: [
          { required: true, message: '请选择分类字段', trigger: 'change' },
        ],
      })
    );

    const onValidate = () => {
      return validate()
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    };
    const reset = () => {
      resetFields();
    };
    return {
      validateInfos,
      reset,
      formRef,
      onValidate,
    };
  },
};
</script>

<style lang='less'>
@import './../index.less';
</style>
