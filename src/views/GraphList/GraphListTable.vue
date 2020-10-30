<template>
  <div :style="style">
    <a-table
      :columns="columns"
      :data-source="data"
    >
      <template #action>
        <span>
          <a>查看</a>
          <a-divider type="vertical" />
          <a>修改</a>
          <a-divider type="vertical" />
          <a>删除</a>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { Table, Divider } from 'ant-design-vue';

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '修改时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
  },
  {
    title: '操作',
    key: 'action',
    slots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: '短信统计',
    type: '饼状图',
    createTime: '2020-10-10',
    updateTime: '2020-10-10',
  },
  {
    key: '2',
    name: '访问统计',
    type: '条形图',
    createTime: '2020-10-10',
    updateTime: '2020-10-10',
  },
  {
    key: '3',
    name: 'xxxx统计',
    type: '条形图',
    createTime: '2020-10-10',
    updateTime: '2020-10-10',
  },
];

export default {
  components: {
    aTable: Table,
    aDivider: Divider,
  },
  props: {
    style: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>

<style>

</style>
