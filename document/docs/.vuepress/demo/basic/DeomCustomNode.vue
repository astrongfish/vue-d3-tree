<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [
    { name: "水果" }, 
    { name: "蔬菜" }
  ],
});


</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData">
      <!-- 使用插槽自定义树节点 -->
      <template #node="{ data, index }">
        <div class="custom-node">
          <img :src="$withBase(`/images/${data.name}.svg`)" />
          {{ data.name }}
          <span>{{ `#${index + 1}` }}</span>
        </div>
      </template>
      <!-- 使用插槽自定义树节点 end -->
    </VueTree>
  </div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid gray;
}

.custom-node {
  width: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  padding: 5px;
}

.custom-node img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.custom-node span {
  margin-left: 5px;
  color: blue;
  font-size: 12px;
}
</style>
