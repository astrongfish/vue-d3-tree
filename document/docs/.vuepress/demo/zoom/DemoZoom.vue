<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
});

const treeRef = ref(null);
const zoomRatio = ref(1);

//放大
const zoomIn = () => {
  zoomRatio.value += 0.1;
  treeRef.value.zoom(zoomRatio.value);
}

//缩小
const zoomOut = () => {
  zoomRatio.value -= 0.1;
  treeRef.value.zoom(zoomRatio.value);
}

//还原
const zoomOrigin = () => {
  zoomRatio.value = 1;
  treeRef.value.zoom(zoomRatio.value);
}

</script>

<template>
  <div>
    <button @click="zoomIn">
      放大
    </button>
    <button @click="zoomOut">
      缩小
    </button>
    <button @click="zoomOrigin">
      还原
    </button>
    <div class="canvas-container">
      <VueTree 
        ref="treeRef" 
        :wheel-zoom="false" 
        :data="treeData" 
      />
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
