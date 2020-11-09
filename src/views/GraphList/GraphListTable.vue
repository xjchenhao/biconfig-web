<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      :key="_id"
    >
      <template
        #action="record"
      >
        <span>
          <a>查看</a>
          <a-divider type="vertical" />
          <a @click="handleUpdate(record)">修改</a>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定删除这条记录?"
            ok-text="是"
            cancel-text="否"
            @confirm="handleConfirmDelete(record)"
          >
            <a>删除</a>
          </a-popconfirm>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
import { Table, Divider, Popconfirm } from 'ant-design-vue';

import { del as getGraphDelete } from '@/api/graph';

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
    aPopconfirm: Popconfirm,
  },
  emits: [ 'get-data' ],
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
    handleUpdate(item) {
      const { _id: id } = item.record;

      this.$router.push(`/graph/config?id=${id}`);
    },
    async handleConfirmDelete(item) {

      const { _id: id } = item.record;

      const res = await getGraphDelete({ id });

      if (Number(res.code) < 0) {
        console.error(res.msg);
        return;
      }

      this.$emit('get-data', {});
    },
  },
};
</script>

<style>

</style>
