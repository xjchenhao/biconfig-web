<template>
  <list-page-layout>
    <graph-list-query @get-data="getData" />
    <graph-list-toolbar style="marginTop:20px" />
    <graph-list-table
      style="marginTop:20px"
      :data="data"
      @get-data="getData"
    />
  </list-page-layout>
</template>

<script>
import ListPageLayout from './../../layout/ListPageLayout';
import GraphListQuery from './GraphListQuery';
import GraphListTable from './GraphListTable';
import GraphListToolbar from './GraphListToolbar';

import { getList as getGraphList } from '@/api/graph';
import request from '@/utils/request';

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
  computed: {
    request() {
      return this.$root.request || request;
    },
  },
  methods: {
    async getData(query) {
      const res = await this.request(getGraphList(query));

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
