<template>
  <list-page-layout>
    <graph-list-query />
    <graph-list-table style="marginTop:20px" />
  </list-page-layout>
</template>

<script>
import ListPageLayout from './../../layout/ListPageLayout';
import GraphListQuery from './GraphListQuery';
import GraphListTable from './GraphListTable';
export default {
  components: {
    GraphListTable,
    GraphListQuery,
    ListPageLayout,
  },
};
</script>

<style>

</style>
