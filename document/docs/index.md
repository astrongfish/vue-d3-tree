## 默认节点

### 默认样式

组件默认提供了一个样式比较简单的树节点，来满足一些简单的场景, 通过指定`default-node-key`来表示要显示数据中哪个属性值。

<DeomDefaultNode />

```vue
<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [
    {name: "水果"},
    {name: "蔬菜"},
  ],
});
</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData" default-node-key="name" />
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

```

`default-node-key`属性可以指定成函数，来获取层级比较复杂的属性

<DeomDefaultNodeFun />

```vue
<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: {en: "Food"},
  children: [
    {name: { en: "Fruit" }},
    {name: { en: "Vegetable"}},
  ],
});

const getNodeKey = (data) => data.name.en
</script>

<template>
  <div class="canvas-container">
    <VueTree :data="treeData" :default-node-key="getNodeKey" />
  </div>
</template>
```


### 修改默认节点样式

可以通过`default-node-style`属性覆盖默认节点的样式

<DeomDefaultNodeStyle/>

```vue
<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
});

//树节点样式
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
```

`default-node-style`属性可以指定成函数，给不同节点指定不同的样式。

<DeomDefaultNodeStyleFun />


```vue
<script setup>
import { ref } from "vue";
import VueTree from "vue3-d3-tree";

const treeData = ref({
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
});

const nodeColor = {
  "食物": "blue",
  "水果": "red",
  "蔬菜": "green"
}

function handleNodeStyle({data}) {
  return {  
            width: '60px',
            height: '30px',
            backgroundColor: nodeColor[data.name],
            color: '#fff',
            textAlign: 'center',
            lineHeight: '30px',
          }
}
</script>

<template>
  <div class="canvas-container">
      <VueTree
        :data="treeData"
        default-node-key="name"
        :default-node-style="handleNodeStyle"
      />
    </div>
</template>
```

## 自定义节点

### 尺寸不变的节点

大多数场景树节点的样式比较复杂，默认的节点无法满足，可以使用Vue插槽的方式自定义树节点。

<DeomCustomNode />

```vue
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
          <img :src="`/images/${data.name}.svg`" />
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

```

### 尺寸变化的节点

当自定义节点的尺寸有变化时，需要调用`reSize`方法，来让组件重新根据变化后的大小来重绘。

<DemoChangeSizeNode/>

SizeNode.vue
```vue
<script setup>
import { ref } from "vue"

const bigSize = ref(true)

const emit = defineEmits(["click"]);

function onClick() {
  bigSize.value = !bigSize.value
  emit('click')
}

</script>

<template>
  <div 
    class="change-size-node" 
    :class="[bigSize ? 'big-size' : 'small-size']"
    @click="onClick">
    {{ bigSize ? "点击变小" : "点击变大" }}
  </div>
</template>
<style scoped>
.change-size-node {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  cursor: pointer;
  font-size: 10px;
}

.big-size {
  width: 60px;
  height: 60px;
}

.small-size {
  width: 40px;
  height: 40px;
}
</style>
```

```vue
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
        <!-- 当节点大小改变后，调用reSize()方法，重新绘制 -->
        <SizeNode @click="() => treeRef.reSize()" />
      </template>
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
</style>
```

## 节点收起和展开

### 点击树节点收起、展开

组件默认不能收起和展开节点，设置属性`collapsed-way=clickTreeNode`, 表示点击树节点来收起和展开。

<DemoCollapsed/>

```vue
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
      default-node-key="name" 
      collapsed-way="clickTreeNode" 
    />
  </div>
</template>
```

默认收起的节点会用虚线样式，可以指定自定义的样式进行覆盖

<DemoCollapsedStyle/>

```vue
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

//树节点折叠样式
const nodeCollapsedStyle = {
  width: '60px',
  height: '30px',
  border: '1px dashed green',
  textAlign: 'center',
  lineHeight: '30px',
}
</script>

<template>
  <div class="canvas-container">
    <VueTree
      :data="treeData"
      collapsed-way="clickTreeNode"
      default-node-key="name"
      :default-node-collapsed-style="nodeCollapsedStyle"
    />
  </div>
</template>
```

### 使用连接节点收起、展开

组件提供了连接节点用于显示一个节点子节点的数量，组件默认不显示连接节点，需要通过指定`show-knot`属性来显示。

可以通过点击连接节点来收起和展开节点， 设置属性`collapsed-way="clickKnotNode"`。

<DemoCollapsedKnot />

```vue
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
      show-knot
      :data="treeData" 
      default-node-key="name" 
      collapsed-way="clickKnotNode" 
    />
  </div>
</template>
```

连接节点也可以通过Vue插槽的方式来自定义，定制满足自己的连接节点。

<DemoCollapsedKnotCustom />

```vue
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
      <!-- 自定义连接节点 -->
      <template #knot="{ node, data, index }">
        <div class="custom-knot">
          {{ node.numChildren }}
        </div>
      </template>
      <!-- 自定义连接节点 -->
    </VueTree>
  </div>
</template>

<style scoped>
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
```

## 排列方向

<DemoDirection />

```vue
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
```


## 缩放

组件默认是通过鼠标滚动进行缩放的，也可以手动进行缩放

<DemoZoom/>

```vue
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

```

## 连接线

连接线支持直线和曲线，也可以设置部分样式

<DemoLink />

```vue
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
```