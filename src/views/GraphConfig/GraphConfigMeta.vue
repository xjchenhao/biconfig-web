<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
      label="别名"
    >
      <a-input
        v-model:value="singleColor"
        placeholder="设置图形颜色"
        @change="handleUpdate"
      />
    </a-form-item>
    <a-form-item
      class="graphConfigForm-from-item"
      label="取值范围"
    >
      <a-input-group>
        <a-input
          style=" width: 45%; text-align: center"
          placeholder="最小值"
        />
        <a-input
          style=" width: 10%; text-align: center; border-left: 0; pointer-events: none; backgroundColor: #fff"
          placeholder="~"
          disabled
        />
        <a-input
          style="width: 45%; text-align: center; border-left: 0"
          placeholder="最大值"
        />
      </a-input-group>
    </a-form-item>
    <a-form-item
      class="graphConfigForm-from-item"
      label="格式化"
    >
      <a-textarea
        :rows="4"
        placeholder=""
      />
    </a-form-item>
  </div>
</template>

<script>
import { Form, Input } from 'ant-design-vue';
import defaultTheme from '@/config/theme';

export default {
  components: {
    aFormItem: Form.Item,
    aTextarea: Input.TextArea,
    aInput: Input,
    aInputGroup: Input.Group,
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
