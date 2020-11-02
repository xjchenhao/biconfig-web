<template>
  <div>
    <a-form-item
      class="graphConfigForm-from-item"
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
      class="graphConfigForm-from-item"
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
      class="graphConfigForm-from-item"
      label="柱子样式配置"
    >
      <a-textarea
        v-model:value="formStyle"
        :rows="4"
        placeholder="用json对象表示"
      />
    </a-form-item>
  </div>
</template>

<script>
import { Form, Input, Slider } from 'ant-design-vue';
export default {
  components: {
    aFormItem: Form.Item,
    aTextarea: Input.TextArea,
    aSlider: Slider,
  },
  emits: [ 'update' ],
  props: {
    basicForm: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      form: {
        columnWidthRatio: 0.5,
        marginRatio: 0.5,
        columnStyle: {},
      },
    };
  },
  computed: {
    isGroup() {
      return this.basicForm.isGroup;
    },
    formStyle: {
      get() {
        return JSON.stringify(this.form.columnStyle);
      },
      set(val) {
        this.form.columnStyle = JSON.parse(val);
      },
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
  mounted() {
    this.handleUpdate();
  },
  methods: {
    handleUpdate() {
      this.$emit('update', this.form);
    },
  },

};
</script>

<style>

</style>
