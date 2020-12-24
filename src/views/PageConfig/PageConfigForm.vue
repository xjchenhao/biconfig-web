<template>
  <div class="PageConfigForm">
    <a-form
      layout="vertical"
    >
      <a-form-item
        class="graphConfigForm-form-item"
        label="关联图表"
      >
        <a-select
          style="width:100%"
          v-model:value="data.uri"
          @change="changeGraphType"
        >
          <a-select-option
            :key="item.uri"
            :value="item.uri"
            v-for="item in allGraphList"
          >
            {{ item.uri }}
          </a-select-option>
        </a-select>
      </a-form-item>
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
  </div>
</template>

<script>
import { Form, Button, Select } from 'ant-design-vue';
import request from '@/utils/request';
import { getList as getGraphList } from '@/api/graph';
export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aSelect: Select,
    aSelectOption: Select.Option,
    aButton: Button,
  },
  data() {
    return {
      data: {
        uri: '',
      },
      allGraphList: [],
    };
  },
  computed: {
    request() {
      return this.$root.request || request;
    },
  },

  async mounted() {
    await this.getGraphList();
  },
  methods: {
    async getGraphList() {
      const res = await this.request(getGraphList());

      if (Number(res.code) < 0) {
        console.error(res.msg);
        return;
      }

      this.allGraphList = res.data.list;
    },
  },
};
</script>

<style lang="less" scoped>
.PageConfigForm{
    padding:15px;
}
</style>
