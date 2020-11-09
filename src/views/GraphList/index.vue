<template>
  <list-page-layout>
    <graph-list-query />
    <graph-list-toolbar style="marginTop:20px" />
    <graph-list-table
      style="marginTop:20px"
      :data="data"
    />
  </list-page-layout>
</template>

<script>
import ListPageLayout from './../../layout/ListPageLayout';
import GraphListQuery from './GraphListQuery';
import GraphListTable from './GraphListTable';
import GraphListToolbar from './GraphListToolbar';

import { getGraphList } from '@/api/graph';
export default {
  components: {
    GraphListTable,
    GraphListQuery,
    GraphListToolbar,
    ListPageLayout,
  },
  data() {
    return {
      data: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await getGraphList();

      if (Number(res.code) < 0) {
        console.error(res.msg);
        return;
      }

      this.data = res.data.list;
    },
  },
};
</script>

<style>

</style>
