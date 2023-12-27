<script setup>
import { ref } from "vue"
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [
    { name: "水果" }, 
    { name: "蔬菜" }
  ],
});

//方向
const direction = ref("vertical");

</script>

<template>
  <div class="demo-main">
    <div>
      <div>
        <label>排列方向:</label>
        <label><input type="radio"  value="vertical" v-model="direction">竖向</label>
        <label><input type="radio"  value="horizontal" v-model="direction">横向</label>
      </div>
      <div class="canvas-container">
        <VueTree
          :data="treeData"
          :direction="direction"
          default-node-key="name"
        />
      </div>
    </div>
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