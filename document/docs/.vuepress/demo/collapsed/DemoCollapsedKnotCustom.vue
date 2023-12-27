<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [
    {
      name: "水果",
      children: [{ name: "苹果" }, { name: "橘子" }]
    },
    {
      name: "蔬菜",
      children: [{ name: "黄瓜" }, { name: "萝卜" }]
    },
    { name: "粮食" },
  ],
});

</script>

<template>
  <div class="canvas-container">
    <VueTree 
      :data="treeData" 
      show-knot
      default-node-key="name"  
      collapsed-way="clickKnotNode">
      <template #knot="{ node, data, index }">
        <div class="custom-knot">
          {{ node.numChildren }}
        </div>
      </template>
    </VueTree>
  </div>
</template>
<style scoped>
.canvas-container {
  width: 100%;
  height: 300px;
  border-radius: 5px;
  border: 1px solid gray;
}

.custom-knot {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  text-align: center;
  line-height: 15px;
  font-size: 12px;
  background-color: #00BFFF;
  color: #fff;
  cursor: pointer;
}
</style>