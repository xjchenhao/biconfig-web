<template>
  <div>
    <a-form-item
      class="graphConfigForm-form-item"
      v-bind="validateInfos.xField"
      label="X轴字段"
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.xField"
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
      class="graphConfigForm-form-item"
      v-bind="validateInfos.yField"
      label="Y轴字段"
    >
      <a-select
        style="width:100%"
        v-model:value="formRef.yField"
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
      class="graphConfigForm-form-item"
    >
      <template #label>
        <span class="ant-form-item-required">柱形图类型</span>
      </template>
      <a-select
        style="width:100%"
        v-model:value="graphType"
        @change="changeGraphType"
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
      v-show="formRef.isStack"
      class="graphConfigForm-form-item"
      v-bind="validateInfos.isPercent"
      label="是否百分百柱状图"
    >
      <a-switch v-model:checked="formRef.isPercent" />
    </a-form-item>
    <a-form-item
      v-show="isShowSeriesField"
      class="graphConfigForm-form-item"
      v-bind="validateInfos.seriesField"
    >
      <template #label>
        <span class="ant-form-item-required">关联字段</span>
      </template>
      <a-select
        style="width:100%"
        v-model:value="formRef.seriesField"
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
import { reactive } from 'vue';
import { useForm } from '@ant-design-vue/use';
import { Switch, Select } from 'ant-design-vue';
import MixinItem from './mixin';
import { mapFindValueType } from '@/utils/filterField';

export default {
  mixins: [ MixinItem ],
  components: {
    aSwitch: Switch,
    aSelect: Select,
    aSelectOption: Select.Option,
  },
  setup() {
    const formRef = reactive({
      xField: '',
      yField: '',
      isGroup: false,
      isStack: false,
      isRange: false,
      isPercent: false,
      seriesField: '',
    });

    const { resetFields, validate, validateInfos } = useForm(
      formRef,
      reactive({
        xField: [
          { required: true, message: '请选择X轴字段', trigger: 'change' },
        ],
        yField: [
          { required: true, message: '请选择Y轴字段', trigger: 'change' },
        ],
        seriesField: [{ validator: async (rule, value) => {
          const isRequired = formRef.isGroup || formRef.isStack;

          if (isRequired && !value) {
            return Promise.reject(new Error('请选择关联字段'));
          }
          return Promise.resolve();

        }, trigger: 'change' }],
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
  computed: {
    graphType: {
      get() {
        if (this.formRef.isGroup) {
          return 'Group';
        }
        if (this.formRef.isStack) {
          return 'Stack';
        }
        if (this.formRef.isRange) {
          return 'Range';
        }
        return '';
      },
      set(type) {
        this.formRef.isGroup = false;
        this.formRef.isStack = false;
        this.formRef.isRange = false;
        this.formRef.seriesField = '';

        if (type !== 'Stack') {
          this.formRef.isPercent = false;
        }

        if (!type) {
          return;
        }

        this.formRef[`is${type}`] = true;
      },
    },
    isShowSeriesField() {
      return this.formRef.isGroup || this.formRef.isStack;
    },
    formIsGroup: {
      get() {
        return this.formRef.isGroup;
      },
      set(value) {

        if (!this.isShowSeriesField) {
          this.formRef.seriesField = '';
        }
        this.formRef.isGroup = value;
      },
    },
  },
  methods: {
    async initDefaultSetting() {
      const data = this.$store.state.data;
      await this.$store.dispatch('setRenderLock', true);

      this.formRef.xField = mapFindValueType(data[0], 'string');
      this.formRef.yField = mapFindValueType(data[0], 'number');

      this.handleUpdate();
      await this.$store.dispatch('setRenderLock', false);
    },
  },
};
</script>

<style lang='less'>
@import './../index.less';
</style>
