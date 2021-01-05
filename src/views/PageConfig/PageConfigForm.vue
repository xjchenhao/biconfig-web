<template>
  <div class="PageConfigForm">
    <a-form
      layout="vertical"
    >
      <h2>基本信息</h2>
      <a-form-item
        class="PageConfigForm-form-item"
        label="页面名称"
      >
        <a-input
          v-model:value="formData.name"
          @change="handleChangePageName"
          placeholder="请输入页面名称"
        />
      </a-form-item>
      <h2>图表规则</h2>
      <div v-if="currentIndex===''">
        请选择组件
      </div>
      <template
        v-else
      >
        <a-form-item
          class="PageConfigForm-form-item"
          label="关联图表"
        >
          <a-select
            style="width:100%"
            :show-search="true"
            v-model:value="formData.uri"
            @change="handleSelectChange"
          >
            <a-select-option
              :key="item.uri"
              :value="item.uri"
              :disabled="existUriList.includes(item.uri)"
              v-for="item in allGraphList"
            >
              {{ item.uri }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </template>
      <a-form-item
        class="PageConfigForm-form-item"
        style="margin-top:20px"
      >
        <!-- <a-button
          type="primary"
          @click="handleFormSubmit"
        >
          提交
        </a-button> -->
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { Form, Select, Input } from 'ant-design-vue';
import request from '@/utils/request';
import { getList as getGraphList } from '@/api/graph';
export default {
  components: {
    aForm: Form,
    aFormItem: Form.Item,
    aSelect: Select,
    aSelectOption: Select.Option,
    aInput: Input,
    // aButton: Button,
  },
  data() {
    return {
      allGraphList: [],
      formData: {
        uri: '',
      },
    };
  },
  computed: {
    request() {
      return this.$root.request || request;
    },
    currentIndex() {
      return this.$store.state.page.currentIndex;
    },
    existUriList() {
      return this.$store.state.page.graphList.map(item => item.uri);
    },
  },
  watch: {
    currentIndex: {
      handler() {
        const { graphList, currentIndex } = this.$store.state.page;
        const formData = {
          name: this.formData.name,
          ...graphList[currentIndex],
        };

        this.formData = formData || {
          name: '',
          uri: '',
        };
      },
      immediate: false,
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
    handleChangePageName(value) {
      this.$store.dispatch('page/setPageName', value);
    },
    handleSelectChange(value) {
      this.$store.dispatch('page/setGraphItem', {
        index: this.currentIndex,
        value: {
          uri: value,
        },
      });
    },
    async handleFormSubmit() {
      console.log('表单提交');
    },
  },
};
</script>

<style lang="less" scoped>
.PageConfigForm{
    padding:15px;
}
</style>
