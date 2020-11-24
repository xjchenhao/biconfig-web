<template>
  <div class="graphConfigFormMeta">
    <div
      class="item"
      v-for="(item,index) in fieldList"
      :key="item"
    >
      <h4>{{ item }}轴配置</h4>
      <item
        :current-index="index"
        @change="handleUpdate"
      />
    </div>
    {{ result }}
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
    fieldList() {
      const result = [];

      const { xField, yField, seriesField } = this.formData;

      xField && result.push(xField);
      yField && result.push(yField);

      if (seriesField && !result.includes(seriesField)) {
        result.push(seriesField);
      }

      return result;
    },
    result() {
      // const result = {};
      // const fieldList = this.fieldList;

      // this.itemData.forEach((item, index) => {
      //   console.log(fieldList[index]);
      //   result[fieldList[index]] = item;
      // });

      // return JSON.stringify(result);
      return JSON.stringify(this.itemData);
    },
  },

  props: {
    formData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    itemIsExistValue(item) {
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
        this.someObject = Object.assign({}, itemData);
      }
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
