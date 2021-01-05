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
import { getDetail as getPageDetail } from '@/api/page';
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
        name: '',
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
    currentId() {
      return this.$route.query.id;
    },
    isModify() {
      return !!this.currentId;
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
    this.getGraphList(); // 获取可用来做关联的图形列表

    if (!this.isModify) {
      return;
    }

    const res = await this.request(getPageDetail({
      id: this.currentId,
    }));

    const { name: pageName, graphList } = res.data;

    this.formData.name = pageName;

    this.$store.dispatch('page/setId', this.currentId);
    this.$store.dispatch('page/setPageName', pageName);
    this.$store.dispatch('page/setGraphList', graphList);
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
    handleChangePageName() {
      this.$store.dispatch('page/setPageName', this.formData.name);
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
