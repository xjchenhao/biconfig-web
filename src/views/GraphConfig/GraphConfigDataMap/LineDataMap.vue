<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
      name="xField"
      label="X轴字段"
      required
    >
      <a-select
        style="width:170px"
        v-model:value="form.xField"
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
      class="graphConfigForm-from-item"
      name="yField"
      label="Y轴字段"
      required
    >
      <a-select
        style="width:170px"
        v-model:value="form.yField"
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
      class="graphConfigForm-from-item"
      name="seriesField"
      label="关联字段"
    >
      <a-select
        style="width:170px"
        v-model:value="form.seriesField"
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
import { Form, Select } from 'ant-design-vue';
import MixinItem from './mixin';

export default {
  mixins: [ MixinItem ],
  components: {
    aFormItem: Form.Item,
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  data() {
    return {
      form: {
        xField: 'year',
        yField: 'value',
        seriesField: '',
      },
    };
  },

};
</script>

<style lang='less'>
@import './../index.less';
</style>
