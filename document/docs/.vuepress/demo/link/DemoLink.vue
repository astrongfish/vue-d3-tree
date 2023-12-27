<script setup>
import { ref } from "vue"
import VueTree from "vue3-d3-tree";

const linkStyle1 = {
  stroke: "gray",
  strokeDasharray: "none",
  strokeOpacity: 1,
  strokeWidth: 1,
};

const linkStyle2 = {
  stroke: "green",
  strokeDasharray: "none",
  strokeOpacity: 1,
  strokeWidth: 2,
};

const treeData = ref({
  name: "食物",
  children: [
    { name: "水果" }, 
    { name: "蔬菜" }
  ],
});

//连接线样式 polyline:折线；curve：曲线
const linkType = ref("polyline")
//连接线样式
const linkStyle = ref(linkStyle1)

</script>

<template>
  <div class="demo-main">
    <div>
      <div>
        <label>类型:</label>
        <label><input type="radio"  value="polyline" v-model="linkType">折线</label>
        <label><input type="radio"  value="curve" v-model="linkType">曲线</label>
      </div>
      <div>
        <label>样式:</label>
        <label><input type="radio"  :value="linkStyle1" v-model="linkStyle">样式1</label>
        <label><input type="radio"  :value="linkStyle2" v-model="linkStyle">样式2</label>
      </div>
      <div class="canvas-container">
        <VueTree
          :data="treeData"
          :lineType="linkType"
          :line-style="linkStyle"
          default-node-key="name"
          collapsed-way="clickTreeNode"
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