<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      row-key="id"
    >
      <template #type="{ text }">
        {{ supportGraphTypeMap[text] }}
      </template>
      <template #createTime="{ text }">
        {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template #updateTime="{ text }">
        {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
      </template>
      <template
        #action="record"
      >
        <span>
          <a @click="handleView(record)">查看</a>
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
import dayjs from 'dayjs';
import { Table, Divider, Popconfirm } from 'ant-design-vue';
import { supportGraphTypeMap } from '@/utils/config';

import { del as getGraphDelete } from '@/api/graph';
import request from '@/utils/request';

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
    slots: { customRender: 'type' },
  },
  {
    title: '唯一标识',
    dataIndex: 'uri',
    key: 'uri',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    slots: { customRender: 'createTime' },
  },
  {
    title: '修改时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    slots: { customRender: 'updateTime' },
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
      dayjs,
      columns,
    };
  },
  computed: {
    request() {
      return this.$root.request || request;
    },
    supportGraphTypeMap() {
      return supportGraphTypeMap;
    },
  },
  methods: {
    handleView(item) {
      const { id: id } = item.record;

      this.$router.push(`/graph/view?id=${id}`);
    },
    handleUpdate(item) {
      const { id: id } = item.record;

      this.$router.push(`/graph/config?id=${id}`);
    },
    async handleConfirmDelete(item) {

      const { id: id } = item.record;

      const res = await this.request(getGraphDelete({ id }));

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
