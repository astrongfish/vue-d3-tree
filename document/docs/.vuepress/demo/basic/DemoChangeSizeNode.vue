<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";
import SizeNode from "./SizeNode.vue"

const treeData = ref({
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
});

const treeRef = ref(null)
</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData" ref="treeRef">
      <template #node="{ data, index }">
        <SizeNode @click="() => treeRef.reSize()" />
      </template>
    </VueTree>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 250px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
