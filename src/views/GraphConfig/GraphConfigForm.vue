<template>
  <div class="graphConfigForm">
    <a-form
      layout="vertical"
    >
      <h2>基本配置</h2>
      <a-form-item
        class="graphConfigForm-form-item"
        v-bind="validateInfos.name"
        label="图表名称"
      >
        <a-input
          v-model:value="formRef.name"
          placeholder="请输入图表名称"
          @change="()=>{
            if(this.isShowTitle){
              this.$nextTick(()=>{
                this.renderGraph()
              })
            }
          }"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-form-item"
        v-bind="validateInfos.uri"
        label="唯一标识"
      >
        <a-input
          v-model:value="formRef.uri"
          placeholder="请输入唯一标识"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-form-item"
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
        class="graphConfigForm-form-item"
        v-bind="validateInfos.apiUrl"
        label="api地址"
      >
        <a-input-search
          v-model:value="formRef.apiUrl"
          placeholder="请输入api地址"
          @search="getData(true)"
        >
          <template #enterButton>
            <a-button>
              获取数据
            </a-button>
          </template>
        </a-input-search>
      </a-form-item>
      <a-form-item
        class="graphConfigForm-form-item"
        label="是否显示标题"
      >
        <a-switch
          v-model:checked="isShowTitle"
          @change="(value)=>{this.handleSwitchUpdate('titleShowType',value)}"
        />
      </a-form-item>
      <a-form-item
        class="graphConfigForm-form-item"
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
        class="graphConfigForm-form-collapse"
        v-model:activeKey="collapseActiveKey"
        :bordered="false"
      >
        <template #expandIcon="{ isActive }">
          <a-caret-right-outlined :rotate="isActive ? 90 : 0" />
        </template>
        <a-collapse-panel
          key="0"
          :style="customStyle"
        >
          <template #header>
            <h3>元信息</h3>
          </template>
          <graph-config-form-meta
            style="padding-left:40px;margin-left: -16px;"
            :form-data="form"
            ref="metaForm"
            :is-modify="isModify"
            @update="handleFormUpdate"
          />
        </a-collapse-panel>
        <a-collapse-panel
          key="1"
          :style="customStyle"
        >
          <template #header>
            <h3>图形样式</h3>
          </template>
          <component
            ref="graphStyleForm"
            :is="currentGraphStyleType"
            @update="handleFormUpdate"
            :form-data="form"
            :is-modify="isModify"
          />
        </a-collapse-panel>
      </a-collapse>
      <a-form-item
        class="graphConfigForm-form-item"
        style="margin-top:20px"
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
import GraphConfigFormMeta from './GraphConfigFormMeta';
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
    GraphConfigFormMeta,
  },
  setup() {
    const formRef = reactive({
      name: '',
      uri: '',
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
        uri: [
          { required: true, message: '请输入唯一标识', trigger: 'change' },
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
      customStyle: 'background:#fff;border-radius: 4px;margin-bottom: 0;border: 0;overflow: hidden',
      collapseActiveKey: [ '0', '1' ],
      graphData: getDefaultData('Column'),
      form: {},
      resultModalVisible: false,
      isInitChange: false,
    };
  },
  watch: {
    formRef: {
      handler(value) {
        this.$store.dispatch('setBasicForm', value);
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
      const supportType = [ 'Column', 'Bar' ];
      let currentType = this.formRef.type;

      // 条形图和柱形图的数据映射配置是一样的
      if (currentType === 'Bar') {
        currentType = 'Column';
      }

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
      // this.isInitChange = false;
      await this.$store.dispatch('setIsInit', false);
      this.renderGraph();

      return;
    }
    // this.isInitChange = true;
    await this.$store.dispatch('setIsInit', true);

    const res = await getGraphDetail({
      id: this.currentId,
    });

    const { type, uri, apiUrl, name, timeFilterShowType, titleShowType, attr } = res.data;

    this.$refs.graphDataMapForm.initData(attr);
    this.$refs.graphStyleForm.initData(attr);
    this.$refs.metaForm.initData(attr);

    this.formRef.name = name;
    this.formRef.uri = uri;
    this.formRef.apiUrl = apiUrl;
    this.formRef.type = type;
    this.formRef.timeFilterShowType = timeFilterShowType;
    this.formRef.titleShowType = titleShowType;
    this.form = attr;
    // this.$nextTick(() => {
    //   this.renderGraph();
    // });

    console.log('加载初始数据');
    console.log(attr);
    await this.getData();
    this.$nextTick(() => {
      // this.$emit('update', {
      //   data: this.graphData,
      //   ...attr,
      //   type,
      //   timeFilterShowType,
      //   titleShowType,
      //   name,
      // });

      this.$store.dispatch('setIsInit', false);
    });
  },
  methods: {
    changeGraphType() {
      this.form = Object.assign({}, this.formRef);
      this.$refs.graphDataMapForm.initData({});
      this.$refs.graphStyleForm.initData({});
      this.$refs.metaForm.initData({});

      this.$nextTick(() => {
        this.renderGraph();
      });
    },
    async getData(isRender = false) {

      const apiUrl = this.formRef.apiUrl;

      if (!apiUrl) {
        this.graphData = getDefaultData(this.formRef.type);
        !isRender && this.renderGraph();

        return;
      }

      const res = await request({
        url: apiUrl,
        method: 'get',
      });

      // this.graphData = res.data.list;
      this.$store.dispatch('setData', res.data.list);
      !isRender && this.renderGraph();
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
      if (this.isInitChange) {
        return;
      }
      this.form = {
        ...this.form,
        ...value,
      };

      this.renderGraph();
    },
    renderGraph() {
      console.log('debug2:', this.form);
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

      // const { name, uri, apiUrl, type, timeFilterShowType, titleShowType, ...attr } = this.form;
      const { name, uri, apiUrl, type, timeFilterShowType, titleShowType } = this.$store.state;
      const attr = await this.$store.dispatch('getGraphConfig');

      console.log(this.$store.state);

      let res;
      if (this.isModify) {
        res = await graphUpdate({
          id: this.currentId,
          type,
          name,
          uri,
          apiUrl,
          attr,
          timeFilterShowType,
          titleShowType,
        });
      } else {
        res = await graphCreate({
          type,
          name,
          uri,
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
