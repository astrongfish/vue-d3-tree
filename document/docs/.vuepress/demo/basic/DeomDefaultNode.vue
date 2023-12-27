<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [
    {name: "水果"},
    {name: "蔬菜"},
  ],
});
</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData" default-node-key="name" />
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 10px;
}
</style>
