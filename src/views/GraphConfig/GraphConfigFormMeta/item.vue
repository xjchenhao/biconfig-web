<template>
  <div>
    <a-form-item
      class="graphConfigForm-form-item"
      label="字段别名"
    >
      <a-input
        v-model:value="form.alias"
        placeholder="请输入字段别名"
        @change="handleInputAlias"
      />
    </a-form-item>
    <a-form-item
      class="graphConfigForm-form-item"
      label="取值范围"
    >
      <a-input-group>
        <a-input
          v-model:value="form.values[0]"
          style=" width: 45%; text-align: center"
          placeholder="最小值"
          @change="()=>{this.handleInputValues(0)}"
        />
        <a-input
          style=" width: 10%; text-align: center; border-left: 0; pointer-events: none; backgroundColor: #fff"
          placeholder="~"
          disabled
        />
        <a-input
          v-model:value="form.values[1]"
          style="width: 45%; text-align: center; border-left: 0"
          placeholder="最大值"
          @change="()=>{this.handleInputValues(1)}"
        />
      </a-input-group>
    </a-form-item>
    <!-- <a-form-item
      class="graphConfigForm-form-item"
      label="格式化"
    >
      <a-textarea
        :rows="4"
        :value="form.formatter"
        placeholder="请遵循格式规范输入"
      />
    </a-form-item> -->
  </div>
</template>

<script>
import { Form, Input } from 'ant-design-vue';

export default {
  components: {
    aFormItem: Form.Item,
    // aTextarea: Input.TextArea,
    aInput: Input,
    aInputGroup: Input.Group,
  },
  emits: [ 'change' ],
  data() {
    return {
      form: {
        alias: '',
        values: [ '', '' ],
        formatter: '',
      },
    };
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0,
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
  methods: {
    initData(formData = {}) {
      this.form.alias = formData.alias;
      this.form.values = [ formData.min, formData.max ];
      this.form.formatter = formData.formatter;
    },

    // 阻止非数字录入
    handleInputValues(index) {
      const numberReg = /\-+\D/ig;
      const lengthReg = /^(.{0,9}).*$/ig;
      const value = this.form.values[index];

      const result = value
        .replace(numberReg, '')
        .replace(lengthReg, '$1');

      this.form.values[index] = result;
    },

    // 限制别名长度
    handleInputAlias() {
      const reg = /^(.{0,10}).*$/ig;
      const value = this.form.alias;

      this.form.alias = value.replace(reg, '$1');
    },
    handleUpdate() {
      console.log('元配置发生更改：', this.form);
      const minValue = this.form && this.form.values && this.form.values.length && this.form.values[0];
      const maxValue = this.form && this.form.values && this.form.values.length && this.form.values[1];

      // proxy对象转换回普通对象
      const result = {
        ...this.form,
      };

      minValue && (result.min = Number(minValue));
      maxValue && (result.max = Number(maxValue));

      this.$nextTick(() => {
        delete result.values;

        this.$emit('change', {
          index: this.currentIndex,
          value: result,
        });
      });
    },
  },

};
</script>

<style>

</style>
