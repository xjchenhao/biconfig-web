<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
      name="colorField"
      label="分类字段"
      required
    >
      <a-select
        style="width:100%"
        v-model:value="form.colorField"
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
      name="angleField"
      label="面积字段"
      required
    >
      <a-select
        style="width:100%"
        v-model:value="form.angleField"
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
import { Select } from 'ant-design-vue';
import MixinItem from './mixin';

export default {
  mixins: [ MixinItem ],
  components: {
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  data() {
    return {
      form: {
        angleField: 'value',
        colorField: 'year',
      },
    };
  },
};
</script>

<style lang='less'>
@import './../index.less';
</style>
