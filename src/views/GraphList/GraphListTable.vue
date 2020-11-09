<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
    >
      <template #action>
        <span>
          <a>查看</a>
          <a-divider type="vertical" />
          <a @click="handleUpdate">修改</a>
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

export default {
  components: {
    aTable: Table,
    aDivider: Divider,
  },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      columns,
    };
  },
  methods: {
    handleUpdate() {
      this.$router.push('/graph/config');
    },
  },
};
</script>

<style>

</style>
