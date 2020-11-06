<template>
  <div>
    <a-form
      layout="vertical"
    >
      <h2>基本配置</h2>
      <a-form-item
        class="graphConfigForm-from-item"
        v-bind="validateInfos.name"
        label="图表名称"
      >
        <a-input
          v-model:value="formRef.name"
          placeholder="请输入图表名称"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-from-item"
        v-bind="validateInfos.type"
        label="图表类型"
      >
        <a-select
          style="width:100%"
          v-model:value="formRef.type"
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
        v-bind="validateInfos.apiUrl"
        label="api地址"
      >
        <a-input-search
          v-model:value="formRef.apiUrl"
          placeholder="请输入api地址"
          @search="getData"
        >
          <template #enterButton>
            <a-button>
              获取数据
            </a-button>
          </template>
        </a-input-search>
      </a-form-item>
      <a-divider />
      <h2>数据映射</h2>
      <component
        :is="currentGraphDataMapType"
        :data="graphData"
        @update="handleFormUpdate"
        :form-data="formRef"
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
            :form-data="formRef"
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
import { reactive, toRaw } from 'vue';
import { ColumnStyle as TheColumnStyle, NotSupport as TheNotSupportStyle } from './GraphConfigStyle';
import { ColumnDataMap as TheColumnDataMap, NotSupport as TheNotSupportDataMap, LineDataMap as TheLineDataMap, PieDataMap as ThePieDataMap } from './GraphConfigDataMap';
import { Form, Button, Select, Divider, Collapse, Switch, Input } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { getData as getDefaultData } from './defaultData';
import request from '@/utils/request';

export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aInput: Input,
    aInputSearch: Input.Search,
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
  setup() {
    const formRef = reactive({
      name: '',
      type: 'Column',
      apiUrl: '',
    });

    const { resetFields, validate, validateInfos } = useForm(
      formRef,
      reactive({
        name: [
          { required: true, message: '请输入图表名称', trigger: 'change' },
          { min: 4, max: 20, message: '请确保名称长度为4～20个字', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '请选择图表类型', trigger: 'change' },
        ],
        apiUrl: [
          { required: true, message: '请输入api地址', trigger: 'change' },
        ],
      })
    );

    const onSubmit = e => {
      e.preventDefault();
      validate()
        .then(res => {
          console.log(res, toRaw(formRef));
        })
        .catch(err => {
          console.log('error', err);
        });
    };
    const reset = () => {
      resetFields();
    };

    return {
      validateInfos,
      reset,
      formRef,
      onSubmit,
    };
  },
  emits: [ 'update' ],
  data() {
    return {
      customStyle: 'background:#fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      activeKey: [ '1' ],
      graphData: getDefaultData('Column'),
    };
  },
  computed: {
    currentGraphStyleType() {
      const supportType = [ 'Column' ];
      const currentType = this.formRef.type;

      const result = supportType.indexOf(currentType) >= 0 ? currentType : 'NotSupport';
      return `The${result}Style`;
    },
    currentGraphDataMapType() {
      const supportType = [ 'Column', 'Bar', 'Line', 'Pie' ];
      let currentType = this.formRef.type;

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
    async getData() {

      const apiUrl = this.formRef.apiUrl;

      if (!apiUrl) {
        this.graphData = getDefaultData(this.formRef.type);
        this.renderGraph();

        return;
      }

      const res = await request({
        url: apiUrl,
        method: 'get',
      });

      this.graphData = res.data.list;
      this.renderGraph();
    },
    handleFormUpdate(value) {
      console.log(value);
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
