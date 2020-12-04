<template>
  <div class="graphConfigFormMeta">
    <div
      class="item"
      v-for="(item,index) in fieldList"
      :key="item"
    >
      <h4>{{ item }}轴配置</h4>
      <item
        :ref="item+'Ref'"
        :current-index="index"
        @change="handleUpdate"
      />
    </div>
  </div>
</template>

<script>
import item from './item';
export default {
  components: {
    item,
  },
  data() {
    return {
      itemData: {},
    };
  },
  computed: {
    isModify() {
      return this.$store.state.isModify;
    },
    formData() {
      const { xField, yField, seriesField } = this.$store.state.opts.fieldMap;
      return {
        xField,
        yField,
        seriesField,
      };
    },
    fieldList() {
      const result = [];

      const { xField, yField, seriesField } = this.formData;
      const fieldMap = { xField, yField, seriesField };

      Object.keys(fieldMap).forEach(key => {
        const value = fieldMap[key];
        if (!value) { return; }

        !result.includes(value) && result.push(value);
      });

      return result;
    },
    result() {
      return JSON.stringify(this.itemData);
    },
  },

  emits: [ 'update' ],
  // props: {
  //   isModify: {
  //     type: Boolean,
  //     default: false,
  //   },
  //   formData: {
  //     type: Object,
  //     default() {
  //       return {};
  //     },
  //   },
  // },
  watch: {
    'formData.xField': function(newVal, oldVal) {
      this.deleteItemData(oldVal);

      this.renderGraph();
    },
    'formData.yField': function(newVal, oldVal) {
      this.deleteItemData(oldVal);

      this.renderGraph();
    },
    'formData.seriesField': function(newVal, oldVal) {
      this.deleteItemData(oldVal);

      this.renderGraph();
    },
  },
  methods: {
    initData(formData) {
      if (this.isModify && formData && formData.meta) {
        this.fieldList.forEach(key => {
          const value = formData.meta[key];
          const itemRef = this.$refs[key + 'Ref' ];
          const isExistValue = this.itemIsExistValue(value);
          if (!isExistValue) {
            return;
          }

          this.itemData[key] = value;
          itemRef && itemRef.initData(value);
        });
      }
    },
    deleteItemData(key) {
      const result = {
        ...this.itemData,
      };

      delete result[key];
      this.itemData = Object.assign({}, result);
    },
    itemIsExistValue(item) {
      if (!item) {
        return false;
      }
      const isAliasExist = item.alias;
      const isFormatterExist = item.formatter;
      const isValueExist = item.min || item.max;

      return isAliasExist || isFormatterExist || isValueExist;
    },
    handleUpdate({ index, value }) {
      const itemData = this.itemData;
      const key = this.fieldList[index];

      if (this.itemIsExistValue(value)) {
        itemData[key] = value;
      } else {
        delete itemData[key];
        this.itemData = Object.assign({}, itemData);
      }

      this.renderGraph();
    },
    renderGraph() {
      // this.$emit('update', {
      //   meta: this.itemData,
      // });
      this.$store.dispatch('setOptsMeta', this.itemData);
    },
  },
};
</script>

<style lang="less" scoped>
.graphConfigFormMeta{
  .item+.item{
    margin-top:20px
  }
}
</style>
