<template>
  <div>
    <a-form-item
      class="graphConfigForm-form-item"
      label="柱状图宽度占比"
    >
      <a-slider
        v-model:value="form.columnWidthRatio"
        :min="0"
        :max="1"
        :step="0.1"
      />
    </a-form-item>
    <a-form-item
      v-if="isGroup"
      class="graphConfigForm-form-item"
      label="分组中柱子之间的间距"
    >
      <a-slider
        v-model:value="form.marginRatio"
        :min="0"
        :max="1"
        :step="0.1"
      />
    </a-form-item>
    <a-form-item
      v-show="!isMultiColor"
      class="graphConfigForm-form-item"
      label="颜色"
    >
      <a-input
        v-model:value="singleColor"
        placeholder="设置图形颜色"
        @change="handleUpdate"
      />
    </a-form-item>
    <a-form-item
      v-show="isMultiColor"
      class="graphConfigForm-form-item"
      label="颜色"
    >
      <a-select
        mode="tags"
        style="width: 100%"
        placeholder="Tags Mode"
        :value="multiColor"
        @change="handleMultiColorChange"
      />
    </a-form-item>
    <!-- <a-form-item
      class="graphConfigForm-form-item"
      label="柱子样式配置"
    >
      <a-textarea
        v-model:value="formStyle"
        :rows="4"
        placeholder="用json对象表示"
      />
    </a-form-item> -->
  </div>
</template>

<script>
import { Form, Input, Slider, Select } from 'ant-design-vue';
import defaultTheme from '@/config/theme';

export default {
  components: {
    aFormItem: Form.Item,
    // aTextarea: Input.TextArea,
    aSlider: Slider,
    aInput: Input,
    aSelect: Select,
    // aSelectOption: Select.Option,
  },
  emits: [ 'update' ],
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      singleColor: defaultTheme.itemSingleColor,
      multiColor: defaultTheme.itemMultiColor,
      form: {
        columnWidthRatio: 0.5,
        marginRatio: 0.5,
        // columnStyle: {},
      },
    };
  },
  computed: {
    isMultiColor() {
      return this.formData.isGroup || this.formData.isStack;
    },
    isGroup() {
      return this.formData.isGroup;
    },
    colorConfigResult() {
      const result = {};

      if (this.isMultiColor) {
        result.colorField = 'type';
        result.color = this.multiColor.length >= 0 ? this.multiColor : defaultTheme.itemMultiColor;
      } else {
        result.color = this.singleColor ? this.singleColor : defaultTheme.itemSingleColor;
      }

      return result;
    },
    // formStyle: {
    //   get() {
    //     return JSON.stringify(this.form.columnStyle);
    //   },
    //   set(val) {
    //     this.form.columnStyle = JSON.parse(val);
    //   },
    // },
  },
  watch: {
    form: {
      handler() {
        this.handleUpdate();
      },
      deep: true,
      immediate: false,
    },
    isMultiColor() {
      this.handleUpdate();
    },
  },
  mounted() {
    this.handleUpdate();
  },
  methods: {
    initData(formData) {
      this.form.columnWidthRatio = formData.columnWidthRatio;
      this.form.marginRatio = formData.marginRatio;

      const isMultiColor = formData.isGroup || formData.isStack;
      isMultiColor ? this.multiColor = formData.color : this.singleColor = formData.color;

      this.$nextTick(() => {
        this.handleUpdate();
      });
    },
    handleMultiColorChange(newValue) {
      const oldValue = this.multiColor;
      const literal = [ 'red', 'blue', 'yellow', 'green' ];// TODO:可以考虑用换个增加更多：https://www.w3school.com.cn/cssref/css_colorsfull.asp
      console.log(123);
      if (oldValue.length > newValue.length) {
        this.multiColor = newValue;

        this.$nextTick(() => {
          this.handleUpdate();
        });

        return;
      }

      const newColor = newValue.slice(-1)[0];

      // TODO:还可以再支持rgb和rgba格式的色值
      if (literal.includes(newColor) || (/^\#[0-9a-f]{6}$/ig).test(newColor)) {
        this.multiColor = newValue;
      }

      this.$nextTick(() => {
        this.handleUpdate();
      });
    },
    handleUpdate() {
      const data = {
        ...this.form,
        ...this.colorConfigResult,
      };
      console.log('颜色配置：', data);
      this.$emit('update', data);
    },
  },

};
</script>

<style>

</style>
