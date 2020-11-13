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
          @change="()=>{this.isShowTitle&&this.renderGraph()}"
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
          @change="changeGraphType"
        >
          <a-select-option
            :key="key"
            :value="key"
            v-for="(value, key) in supportGraphTypeMap"
          >
            {{ value }}
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
      <a-form-item
        class="graphConfigForm-from-item"
        label="是否显示标题"
      >
        <a-switch
          v-model:checked="isShowTitle"
          @change="(value)=>{this.handleSwitchUpdate('titleShowType',value)}"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-from-item"
        label="是否显示时间筛选器"
      >
        <a-switch
          v-model:checked="isShowTimeFilter"
          @change="(value)=>{this.handleSwitchUpdate('timeFilterShowType',value)}"
        />
      </a-form-item>
      <a-divider />
      <h2>数据映射</h2>
      <component
        ref="graphDataMapForm"
        :is="currentGraphDataMapType"
        :data="graphData"
        :is-modify="isModify"
        @update="handleFormUpdate"
        :form-data="form"
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
            :form-data="form"
            :is-modify="isModify"
          />
        </a-collapse-panel>
      </a-collapse>
      <a-form-item
        class="graphConfigForm-from-item"
      >
        <a-button
          type="primary"
          @click="handleFormSubmit"
        >
          提交
        </a-button>
      </a-form-item>
    </a-form>
    <a-modal
      :visible="resultModalVisible"
      :footer="null"
    >
      <a-result
        status="success"
        :title="isModify?'图表配置修改完成':'图表配置创建完成'"
      >
        <template #extra>
          <a-button
            key="console"
            type="primary"
            @click="handleGotoView"
          >
            立即查看
          </a-button>
          <a-button
            key="buy"
            @click="handleGotoHome"
          >
            返回主页
          </a-button>
        </template>
      </a-result>
    </a-modal>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { ColumnStyle as TheColumnStyle, NotSupport as TheNotSupportStyle } from './GraphConfigStyle';
import { ColumnDataMap as TheColumnDataMap, NotSupport as TheNotSupportDataMap, LineDataMap as TheLineDataMap, PieDataMap as ThePieDataMap } from './GraphConfigDataMap';
import { Form, Button, Select, Divider, Collapse, Switch, Input, Result, Modal, message } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { getData as getDefaultData } from './defaultData';
import request from '@/utils/request';
import { supportGraphTypeMap } from '@/utils/config';

import { create as graphCreate, getDetail as getGraphDetail, update as graphUpdate } from '@/api/graph';

export default {
  components: {
    aModal: Modal,
    aResult: Result,
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
      timeFilterShowType: 0,
      titleShowType: 0,
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
  emits: [ 'update' ],
  data() {
    return {
      viewId: '',
      customStyle: 'background:#fff;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      activeKey: [ '1' ],
      graphData: getDefaultData('Column'),
      form: {},
      resultModalVisible: false,
    };
  },
  watch: {
    formRef: {
      handler(value) {
        this.form = {
          ...this.form,
          ...value,
        };
      },
      deep: true,
      immediate: false,
    },
  },
  computed: {
    isShowTimeFilter: {
      get() {
        return !!this.formRef.timeFilterShowType;
      },
      set(value) {
        this.formRef.timeFilterShowType = Number(value);
      },
    },
    isShowTitle: {
      get() {
        return !!this.formRef.titleShowType;
      },
      set(value) {
        this.formRef.titleShowType = Number(value);
      },
    },
    supportGraphTypeMap() {
      return supportGraphTypeMap;
    },
    currentId() {
      return this.$route.query.id;
    },
    isModify() {
      return !!this.currentId;
    },
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
  async mounted() {
    if (!this.isModify) {
      this.renderGraph();

      return;
    }

    const res = await getGraphDetail({
      id: this.currentId,
    });

    const { type, apiUrl, name, timeFilterShowType, titleShowType } = res.data;

    this.$refs.graphDataMapForm.initData(res.data.attr);

    this.formRef.name = name;
    this.formRef.apiUrl = apiUrl;
    this.formRef.type = type;
    this.formRef.timeFilterShowType = timeFilterShowType;
    this.formRef.titleShowType = titleShowType;
  },
  methods: {
    changeGraphType() {
      this.form = Object.assign({}, this.formRef);
      this.renderGraph();
    },
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

    // 开关数据变动时，会触发它
    handleSwitchUpdate(type, value) {
      console.log(type, value);
      this.form = {
        ...this.form,
        [type]: value,
      };

      this.renderGraph();
    },

    // 字表单数据变动时，会触发它
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
    handleGotoView() {
      // this.$router.replace(`/graph/view?id=${this.viewId}`);
      this.$router.replace({ path: '/graph/view', query: { id: this.viewId } });
    },
    handleGotoHome() {
      this.$router.replace('/graph');
    },
    async handleFormSubmit() {

      const basisFormValidateResult = await this.onValidate();
      const graphDataMapFormValidateResult = await this.$refs.graphDataMapForm.onValidate();

      console.log(basisFormValidateResult);
      console.log(graphDataMapFormValidateResult);

      if (!basisFormValidateResult || !graphDataMapFormValidateResult) {
        message.error('格式错误，请检查表单内容！');
        return;
      }

      const { name, apiUrl, type, timeFilterShowType, titleShowType, ...attr } = this.form;

      let res;
      if (this.isModify) {
        res = await graphUpdate({
          id: this.currentId,
          type,
          name,
          apiUrl,
          attr,
          timeFilterShowType,
          titleShowType,
        });
      } else {
        res = await graphCreate({
          type,
          name,
          apiUrl,
          attr,
          timeFilterShowType,
          titleShowType,
        });
      }

      if (Number(res.code) < 0) {
        console.error(res.msg);
        return;
      }

      this.viewId = this.isModify ? this.currentId : res.data.id;

      console.log(this.viewId);

      this.resultModalVisible = true;

    },
  },
};
</script>

<style lang='less'>
@import './index.less';
</style>
