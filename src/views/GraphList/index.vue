<template>
  <list-page-layout>
    <graph-list-query />
    <graph-list-toolbar style="marginTop:20px" />
    <graph-list-table style="marginTop:20px" />
  </list-page-layout>
</template>

<script>
import ListPageLayout from './../../layout/ListPageLayout';
import GraphListQuery from './GraphListQuery';
import GraphListTable from './GraphListTable';
import GraphListToolbar from './GraphListToolbar';

export default {
  components: {
    GraphListTable,
    GraphListQuery,
    GraphListToolbar,
    ListPageLayout,
  },
};
</script>

<style>

</style>
