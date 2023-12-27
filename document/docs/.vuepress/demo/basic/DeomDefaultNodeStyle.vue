<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
});

const nodeStyle = ref({
  width: "60px",
  height: "30px",
  borderColor: "red",
  backgroundColor: "green",
  color: "#fff",
  textAlign: "center",
  lineHeight: "30px",
});
</script>

<template>
  <div class="canvas-container">
      <VueTree
        :data="treeData"
        default-node-key="name"
        :default-node-style="nodeStyle"
      />
    </div>
</template>

<style scoped>
.canvas-container {
  width: 100%;
  height: 200px;
  border-radius: 5px;
  border: 1px solid gray;
}
</style>
