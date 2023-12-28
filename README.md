# Vue3 D3 Tree
[![Npm version](https://img.shields.io/npm/v/vue3-d3-tree.svg)](https://www.npmjs.com/package/vue3-d3-tree)

使用 D3 实现的 Vue3 树状图

## 特性

- 内置默认节点
- 支持自定义节点
- 支持横向、竖向排列方式
- 支持缩放、拖拽
- 支持节点收起、展开
- 支持修改连线样式

## 用法

[Demo](https://astrongfish.github.io/vue-d3-tree/)

```
npm i vue3-d3-tree
```

```vue
<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
});
</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData">
      <!-- 使用插槽自定义树节点 -->
      <template #node="{ data, index }">
        <div class="custom-node">
          {{ data.name }}
        </div>
      </template>
      <!-- 使用插槽自定义树节点 end -->
    </VueTree>
  </div>
</template>
```

## 组件参数

### 属性

| 属性                      | 类型               | 默认值     | 说明                                                                      |
| ------------------------- | ------------------ | ---------- | ------------------------------------------------------------------------- |
| data                      | Object             |            | 数据                                                                      |
| direction                 | String             | vertical   | 布局方向 vertical:竖向排列；horizontal：横向排列                          |
| childrenKey               | String 或 Function | "children" | 字节的属性值                                                              |
| defaultNodeKey            | String 或 Function |            | 默认节点显示的数据的属性值                                                |
| defaultNodeStyle          | String 或 Function |            | 默认节点样式                                                              |
| defaultNodeCollapsedStyle | String 或 Function |            | 默认节点收起的样式                                                        |
| showKnot                  | Boolean            | false      | 是否显示连接节点                                                          |
| wheelZoom                 | Boolean            | true       | 是否鼠标滚动缩放                                                          |
| lineType                  | String             | polyline   | 连接线类型 polyline：折线；curve：曲线                                    |
| lineStyle                 | Object             |            | 连接线样式                                                                |
| collapsedWay              | String             |            | 节点收起、展开方式 clickTreeNode: 点击树节点；clickKnotNode：点击连接节点 |
| top                       | String 或 Number   | 20         | 距顶部之间的距离                                                          |
| left                      | String 或 Number   | 'center'   | 距左侧之间的距离                                                          |
| hierarchyMargin           | Number             | 60         | 树层级之间的间距                                                          |
| neighborMargin            | Number             | 20         | 树节点之间的间距                                                          |
| stretchLength             | Number             | 10         | 树节点连接线延长的长度                                                    |
| knotStretchLength         | Number             | 5          | 连接节点连接线延长的长度                                                  |

### 方法

| 方法名       | 参数  | 说明                                                 |
| ------------ | ----- | ---------------------------------------------------- |
| zoom         | radio | 缩放                                                 |
| reSize       |       | 自定义节点尺寸发生变化后，调用该方法重新适配节点大小 |
| collapseNode | node  | 收起、展开节点                                       |
