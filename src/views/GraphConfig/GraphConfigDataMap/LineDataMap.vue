<template>
  <div>
    <a-form-item
      class="graphConfigForm-form-item"
      v-bind="validateInfos.xField"
      label="X轴字段"
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.xField"
        @change="renderGraph"
        placeholder="请选择X轴字段"
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
      class="graphConfigForm-form-item"
      v-bind="validateInfos.yField"
      label="Y轴字段"
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.yField"
        @change="renderGraph"
        placeholder="请选择Y轴字段"
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
      class="graphConfigForm-form-item"
      v-bind="validateInfos.seriesField"
      label="关联字段"
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.seriesField"
        @change="renderGraph"
        placeholder="请选择关联字段"
      >
        <a-select-option
          value=""
          :key="null"
        >
          无
        </a-select-option>
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
import { mapFindValueType } from '@/utils/filterField';

export default {
  mixins: [ MixinItem ],
  components: {
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  setup() {
    const formRef = reactive({
      xField: '',
      yField: '',
      seriesField: '',
    });

    const { resetFields, validate, validateInfos } = useForm(
      formRef,
      reactive({
        xField: [
          { required: true, message: '请选择X轴字段', trigger: 'change' },
        ],
        yField: [
          { required: true, message: '请选择Y轴字段', trigger: 'change' },
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
  methods: {
    async initDefaultSetting() {
      const data = this.$store.state.data;

      this.formRef.xField = mapFindValueType(data[0], 'string');
      this.formRef.yField = mapFindValueType(data[0], 'number');

      this.handleUpdate();
    },
  },

};
</script>

<style lang='less'>
@import './../index.less';
</style>
