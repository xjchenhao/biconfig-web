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
          style="width:100%"
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
      <a-form-item
        class="graphConfigForm-from-item"
        name="apiUrl"
        label="api地址"
      >
        <a-input
          v-model:value="form.apiUrl"
          placeholder="请输入api地址"
        />
      </a-form-item>
      <a-divider />
      <h2>数据映射</h2>
      <component
        :is="currentGraphDataMapType"
        :data="graphData"
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

const defaultData = [
  { year: '1951 年', value: 380, valueArray: [ 380 - 30, 380 ], name: '收入' },
  { year: '1952 年', value: 520, valueArray: [ 520 - 30, 520 ], name: '收入' },
  { year: '1956 年', value: 610, valueArray: [ 610 - 30, 610 ], name: '收入' },
  { year: '1957 年', value: 1450, valueArray: [ 1450 - 30, 1450 ], name: '收入' },
  { year: '1958 年', value: 480, valueArray: [ 480 - 30, 480 ], name: '收入' },
  { year: '1951 年', value: 38, valueArray: [ 38 - 30, 38 ], name: '支出' },
  { year: '1952 年', value: 52, valueArray: [ 52 - 30, 52 ], name: '支出' },
  { year: '1956 年', value: 61, valueArray: [ 61 - 30, 61 ], name: '支出' },
  { year: '1957 年', value: 145, valueArray: [ 145 - 30, 145 ], name: '支出' },
  { year: '1958 年', value: 48, valueArray: [ 48 - 30, 48 ], name: '支出' },
];

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
  data() {
    return {
      customStyle: 'background:#fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      activeKey: [ '1' ],
      form: {
        name: '',
        type: 'Column',
        apiUrl: '',
      },
      graphData: defaultData,
    };
  },
  watch: {
    'form.apiUrl': function(value) {

      if (!value) {
        this.graphData = defaultData;
        this.renderGraph();

        return;
      }

      this.graphData = [
        { year: '1951 年', value: 1380, valueArray: [ 380 - 30, 380 ], name: '收入' },
        { year: '1952 年', value: 1520, valueArray: [ 520 - 30, 520 ], name: '收入' },
        { year: '1956 年', value: 1610, valueArray: [ 610 - 30, 610 ], name: '收入' },
        { year: '1957 年', value: 11450, valueArray: [ 1450 - 30, 1450 ], name: '收入' },
        { year: '1958 年', value: 1480, valueArray: [ 480 - 30, 480 ], name: '收入' },
        { year: '1951 年', value: 138, valueArray: [ 38 - 30, 38 ], name: '支出' },
        { year: '1952 年', value: 152, valueArray: [ 52 - 30, 52 ], name: '支出' },
        { year: '1956 年', value: 161, valueArray: [ 61 - 30, 61 ], name: '支出' },
        { year: '1957 年', value: 1145, valueArray: [ 145 - 30, 145 ], name: '支出' },
        { year: '1958 年', value: 148, valueArray: [ 48 - 30, 48 ], name: '支出' },
      ];
      this.renderGraph();
    },
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
      this.$emit('update', {
        data: this.graphData,
        ...this.form,
      });
    },
  },
};
</script>

<style lang='less'>
@import './index.less';
</style>
