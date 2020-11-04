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

export default {
  components: {
    aFormItem: Form.Item,
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  emits: [ 'update' ],
  props: {
    basicForm: {
      type: Object,
      default() {
        return {};
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
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
  computed: {
    // 字段列表
    fieldList() {
      return Object.keys(this.data[0]);
    },
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

<style lang='less'>
@import './../index.less';
</style>
