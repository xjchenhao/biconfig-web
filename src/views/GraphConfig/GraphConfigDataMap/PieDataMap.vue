<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
      name="angleField"
      label="扇形切片大小字段"
      required
    >
      <a-select
        style="width:170px"
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
    <a-form-item
      class="graphConfigForm-from-item"
      name="colorField"
      label="扇形颜色字段"
      required
    >
      <a-select
        style="width:170px"
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
        angleField: 'year',
        colorField: 'value',
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
