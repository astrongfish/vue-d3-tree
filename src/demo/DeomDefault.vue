<script setup>
import { ref } from "vue";
import VueTree from "../VueD3Tree/index.vue";
import {
  fakeData1,
  fakeData2,
  nodeStyle1,
  collapsedNodeStyle1,
  FunNodeStyle,
  linkStyle1,
} from "./fakeData";
import CustomChangeSizeNode from "./CustomChangeSizeNode.vue";

//数据
const treeData = ref(fakeData1);
//方向
const direction = ref("vertical");
//默认节点样式
const defaultNodeStyle = ref(null);
//层级间距
const hierarchyMargin = ref(null);
//相邻间距
const neighborMargin = ref(null);
//上边距
const top = ref(null);
//左边距
const left = ref(null);
//节点延长线
const stretchLength = ref(10);
//显示连接节点
const showKnot = ref(false);
//连接节点延长线
const knotStretchLength = ref(5);
//鼠标缩放
const wheelZoom = ref(true);
//连线样式
const lineType = ref("polyline");
//连线样式
const lineStyle = ref(null);
//默认折叠节点样式
const defaultNodeCollapsedStyle = ref(null)
//展开方式
const collapsedWay = ref(null)

const reSizeTreeRef = ref(null);

const params = ref([
  {
    name: "data",
    ref: treeData,
    items: [
      { name: "数据1", value: fakeData1 },
      { name: "数据2", value: fakeData2 },
    ],
  },
  {
    name: "direction",
    ref: direction,
    items: [
      { name: "垂直", value: "vertical" },
      { name: "水平", value: "horizontal" },
    ],
  },
  {
    name: "top",
    ref: top,
    items: [
      { name: "默认", value: null },
      { name: "100", value: 100 },
    ],
  },
  {
    name: "left",
    ref: left,
    items: [
      { name: "默认", value: null },
      { name: "200", value: 200 },
    ],
  },
  {
    name: "hierarchyMargin",
    ref: hierarchyMargin,
    items: [
      { name: "默认", value: null },
      { name: "200", value: 200 },
    ],
  },
  {
    name: "neighborMargin",
    ref: neighborMargin,
    items: [
      { name: "默认", value: null },
      { name: "200", value: 200 },
    ],
  },
  {
    name: "stretchLength",
    ref: stretchLength,
    items: [
      { name: "默认", value: 10 },
      { name: "50", value: 50 },
    ],
  },
  {
    name: "showKnot",
    ref: showKnot,
    items: [
      { name: "开启", value: true },
      { name: "关闭", value: false },
    ],
  },
  {
    name: "knotStretchLength",
    ref: knotStretchLength,
    items: [
      { name: "默认", value: 5 },
      { name: "10", value: 10 },
    ],
  },
  {
    name: "wheelZoom",
    ref: wheelZoom,
    items: [
      { name: "开启", value: true },
      { name: "关闭", value: false },
    ],
  },
  {
    name: "lineType",
    ref: lineType,
    items: [
      { name: "折线", value: "polyline" },
      { name: "曲线", value: "curve" },
    ],
  },
  {
    name: "lineStyle",
    ref: lineStyle,
    items: [
      { name: "默认", value: null },
      { name: "样式1", value: linkStyle1 },
    ],
  },
  {
    name: "defaultNodeStyle",
    ref: defaultNodeStyle,
    items: [
      { name: "默认", value: null },
      { name: "样式1", value: nodeStyle1 },
      { name: "函数", value: FunNodeStyle },
    ],
  },
  {
    name: "defaultNodeCollapsedStyle",
    ref: defaultNodeCollapsedStyle,
    items: [
      { name: "默认", value: null },
      { name: "样式1", value: collapsedNodeStyle1 },
    ],
  },
  {
    name: "collapsedWay",
    ref: collapsedWay,
    items: [
      { name: "默认", value: null },
      { name: "点击树节点", value: "clickTreeNode" },
      { name: "点击连接节点", value: "clickKnotNode" },
    ],
  },
]);
</script>

<template>
  <div class="demo-main">
    <div>
      <div v-for="p in params">
        <label>{{ p.name }}</label>
        <label v-for="item in p.items">
          <input type="radio" :value="item.value" v-model="p.ref" />
          {{ item.name }}
        </label>
      </div>
      <div class="canvas-container">
        <VueTree
          default-node-key="name"
          :top="top"
          :left="left"
          :data="treeData"
          :direction="direction"
          :hierarchyMargin="hierarchyMargin"
          :neighborMargin="neighborMargin"
          :stretch-length="stretchLength"
          :show-knot="showKnot"
          :knot-stretch-length="knotStretchLength"
          :wheel-zoom="wheelZoom"
          :line-type="lineType"
          :line-style="lineStyle"
          :default-node-style="defaultNodeStyle"
          :default-node-collapsed-style="defaultNodeCollapsedStyle"
          :collapsedWay="collapsedWay"
        />
      </div>
    </div>
    <div>
      <h3>自定义节点</h3>
      <div class="canvas-container">
        <VueTree :data="treeData">
          <template #node="{ data, index }">
            <div class="custom-node">
              <img :src="`/images/${data.name}.svg`" />
              {{ data.name }}
              <span>{{ `#${index + 1}` }}</span>
            </div>
          </template>
        </VueTree>
      </div>
    </div>
    <div>
      <h3>自定义节点，改变节点大小</h3>
      <div class="canvas-container">
        <VueTree :data="treeData" ref="reSizeTreeRef">
          <template #node="{ data, index }">
            <CustomChangeSizeNode @click="() => reSizeTreeRef.reSize()" />
          </template>
        </VueTree>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-main {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.canvas-container {
  width: 700px;
  height: 400px;
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
