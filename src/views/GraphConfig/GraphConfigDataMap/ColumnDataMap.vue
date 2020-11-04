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
    >
      <a-select
        style="width:170px"
        v-model:value="form.seriesField"
        @change="renderGraph"
        placeholder="请选择关联字段"
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
import { Switch, Select } from 'ant-design-vue';
import MixinItem from './mixin';

export default {
  mixins: [ MixinItem ],
  components: {
    aSwitch: Switch,
    aSelect: Select,
    aSelectOption: Select.Option,
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

        if (!type) {
          return;
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

};
</script>

<style lang='less'>
@import './../index.less';
</style>
