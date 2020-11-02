<template>
  <div>
    <a-form
      layout="vertical"
      :model="basicForm"
    >
      <h2>基本配置</h2>
      <a-form-item
        class="graphConfigForm-from-item"
        name="type"
        label="表单类型"
        required
      >
        <a-select
          style="width:170px"
          v-model:value="basicForm.type"
        >
          <a-select-option value="Column">
            柱形图
          </a-select-option>
          <a-select-option value="Line">
            折线图
          </a-select-option>
          <a-select-option value="Bar">
            柱状图
          </a-select-option>
          <a-select-option value="Pie">
            饼状图
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        class="graphConfigForm-from-item"
        name="xField"
        label="X轴字段"
        required
      >
        <a-input
          v-model:value="basicForm.xField"
          placeholder="请填写X轴字段"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-from-item"
        name="yField"
        label="Y轴字段"
        required
      >
        <a-input
          v-model:value="basicForm.yField"
          placeholder="请填写Y轴字段"
        />
      </a-form-item>
      <a-divider />
      <h2>更多配置</h2>

      <a-collapse
        v-model:activeKey="activeKey"
        :bordered="false"
      >
        <template #expandIcon="{ isActive }">
          <a-caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel
          key="1"
          header="图形样式"
          :style="customStyle"
        >
          <component
            :is="currentGraphStyleType"
            @update="handleStyleUpdate"
            :basic-form="basicForm"
          />
        </a-collapse-panel>
      </a-collapse>
      <a-form-item
        class="graphConfigForm-from-item"
      >
        <a-button type="primary">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Column as TheColumn, NotSupport as TheNotSupport } from './GraphConfigStyleType';
import { Form, Input, Button, Select, Divider, Collapse } from 'ant-design-vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aButton: Button,
    aSelect: Select,
    aSelectOption: Select.Option,
    aDivider: Divider,
    aCollapse: Collapse,
    aCollapsePanel: Collapse.Panel,
    aCaretRightOutlined: CaretRightOutlined,
    TheColumn,
    TheNotSupport,
  },
  emits: [ 'update' ],
  data() {
    return {
      customStyle: 'background:#fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      activeKey: [ '1' ],
      basicForm: {
        type: 'Column',
        xField: 'year',
        yField: 'value',
      },
      styleForm: {

      },
    };
  },
  watch: {
    basicForm: {
      handler() {
        this.handleFormUpdate();
      },
      deep: true,
      immediate: false,
    },
  },
  computed: {
    currentGraphStyleType() {
      const supportType = [ 'Column' ];
      const currentType = this.basicForm.type;

      const result = supportType.indexOf(currentType) >= 0 ? currentType : 'NotSupport';
      return `The${result}`;
    },
  },
  mounted() {
    this.handleFormUpdate();
  },
  methods: {
    handleStyleUpdate(value) {
      this.styleForm = value;
      this.handleFormUpdate();
    },
    handleFormUpdate() {
      this.$emit('update', {
        ...this.basicForm,
        ...this.styleForm,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.graphConfigForm{
  &-from-item{
    margin-bottom:0;
  }
}
</style>
