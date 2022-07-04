<template>
  <input
    type="checkbox"
    @click="checkedHandler($event)"
    :checked="params.value"
  />
</template>
<script>
export default {
  name:"adminCheckCell",
  methods: {
    checkedHandler() {
      let colId = this.params.column.colId;
      this.params.node.setDataValue(colId, !this.params.node.data.admin);
    }
  }
}
</script>
