<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: {en: "Food"},
  children: [
    {
      name: { en: "Fruit" }
    },
    {
      name: { en: "Vegetable"}
    },
  ],
});

const getNodeKey = (data) => {
  console.log('%%%%', data)
  return data.name.en
}
</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData" :default-node-key="getNodeKey" />
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