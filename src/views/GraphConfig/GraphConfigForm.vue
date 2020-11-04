<template>
  <div>
    <a-form
      layout="vertical"
      :model="form"
    >
      <h2>基本配置</h2>
      <a-form-item
        class="graphConfigForm-from-item"
        name="name"
        label="图表名称"
        required
      >
        <a-input
          v-model:value="form.name"
          placeholder="请输入图表名称"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-from-item"
        name="type"
        label="图表类型"
        required
      >
        <a-select
          style="width:170px"
          v-model:value="form.type"
          @change="renderGraph"
        >
          <a-select-option value="Column">
            柱形图
          </a-select-option>
          <a-select-option value="Line">
            折线图
          </a-select-option>
          <a-select-option value="Bar">
            条形图
          </a-select-option>
          <a-select-option value="Pie">
            饼状图
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-divider />
      <h2>数据映射</h2>
      <component
        :is="currentGraphDataMapType"
        :data="data"
        @update="handleFormUpdate"
        :basic-form="form"
      />
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
            @update="handleFormUpdate"
            :basic-form="form"
          />
        </a-collapse-panel>
      </a-collapse>
      <a-form-item
        class="graphConfigForm-from-item"
      >
        <a-button type="primary">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { ColumnStyle as TheColumnStyle, NotSupport as TheNotSupportStyle } from './GraphConfigStyle';
import { ColumnDataMap as TheColumnDataMap, NotSupport as TheNotSupportDataMap, LineDataMap as TheLineDataMap, PieDataMap as ThePieDataMap } from './GraphConfigDataMap';
import { Form, Button, Select, Divider, Collapse, Switch, Input } from 'ant-design-vue';
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
    aSwitch: Switch,
    TheColumnStyle,
    TheNotSupportStyle,
    TheColumnDataMap,
    TheNotSupportDataMap,
    TheLineDataMap,
    ThePieDataMap,
  },
  emits: [ 'update' ],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      customStyle: 'background:#fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      activeKey: [ '1' ],
      form: {
        name: '',
        type: 'Column',
      },
    };
  },
  computed: {
    currentGraphStyleType() {
      const supportType = [ 'Column' ];
      const currentType = this.form.type;

      const result = supportType.indexOf(currentType) >= 0 ? currentType : 'NotSupport';
      return `The${result}Style`;
    },
    currentGraphDataMapType() {
      const supportType = [ 'Column', 'Bar', 'Line', 'Pie' ];
      let currentType = this.form.type;

      // 条形图和柱形图的数据映射配置是一样的
      if (currentType === 'Bar') {
        currentType = 'Column';
      }

      const result = supportType.indexOf(currentType) >= 0 ? currentType : 'NotSupport';
      return `The${result}DataMap`;
    },
  },
  mounted() {
    this.renderGraph();
  },
  methods: {
    handleFormUpdate(value) {
      this.form = {
        ...this.form,
        ...value,
      };

      this.renderGraph();
    },
    renderGraph() {
      this.$emit('update', this.form);
    },
  },
};
</script>

<style lang='less'>
@import './index.less';
</style>
