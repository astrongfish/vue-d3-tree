<script setup>
import { ref, watch, onMounted, onUpdated, toRaw, nextTick } from "vue";
import _ from "loadsh";
import * as uuid from "uuid";
import * as p from "./data/props";
import * as draw from "./draw/index";
import * as extra from "./data/extraData";
import DefaultNode from "./default/node.vue";
import DefaultKnot from "./default/knot.vue";

const props = defineProps(p.validProps);

const zoomListner = ref(null);
const transform = ref("");
const scale = ref(1);
const changedSize = ref(false);
const treeData = ref({});

const id = uuid.v4().replaceAll("-", "");
const nodeClass = ref(`node-${id}`);
const containerId = ref(`tree-container-${id}`);

const foreignObjectStyle = ref({
  overflow: "visible",
});

const nodeStyle = ref({
  position: "absolute",
});

//树节点
const nodes = ref([]);
//连接线源节点
const stretchLines = ref([]);
//横向直线连接线
const straightHLines = ref([]);
//竖向直线连接线
const straightVLines = ref([]);
//曲线连接线
const curveLines = ref([]);
//连接节点
const knots = ref([]);
//连接点延长线
const knotStretchLines = ref([]);

const treeRef = ref(null);

onMounted(() => {
  treeData.value = _.cloneDeep(props.data);
  const listner = draw.zoomListner(
    containerId.value,
    props,
    treeRef.value,
    (e) => {
      transform.value = e.transform;
      scale.value = e.transform.k;
    }
  );
  zoomListner.value = listner;
  _reDraw();
});

onUpdated(() => {
  if (!changedSize.value) {
    _reSize();
    changedSize.value = true;
  }
});

watch(
  () => props.data,
  (data) => {
    treeData.value = _.cloneDeep(data);
    changedSize.value = false;
    _reDraw();
  }
);

//重新调整位置
watch([() => props.top, () => props.left, () => props.direction], () => {
  changedSize.value = false;
  _reDraw();
  draw.rePosition(containerId.value, props, treeRef.value, zoomListner.value);
});

//重绘
watch(
  [
    () => props.showKnot,
    () => props.hierarchyMargin,
    () => props.neighborMargin,
    () => props.defaultNodeStyle,
    () => props.defaultNodeCollapsedStyle,
  ],
  () => {
    changedSize.value = false;
    _reDraw();
  }
);

/**
 * 重绘
 */
function _reDraw() {
  if (treeData.value && Object.keys(treeData.value).length > 0) {
    const data = draw.draw(treeData.value, props);
    nodes.value = data.nodes;
    stretchLines.value = data.stretchLines;
    straightHLines.value = data.straightHLines;
    straightVLines.value = data.straightVLines;
    curveLines.value = data.curveLines;
    knots.value = data.knots;
    knotStretchLines.value = data.knotStretchLines;
  }
}

/**
 * 调整节点大小
 */
function _reSize() {
  draw.reSize(nodes.value, scale.value, toRaw(nodeClass.value));
  _reDraw();
}

/**
 * 默认节点的标题
 * @param {*} data
 * @param {*} index
 */
function _getDefaultNodeTitle(data, index) {
  return p.getDefaultNodeKey(props, data) || index;
}

/**
 * 默认值节点样式
 * @param {*} node
 */
function _getDefaultNodeStyle(node) {
  if (extra.getNodeRootCollapsed(node)) {
    return p.getDefaultNodeCollapsedStyle(props, node);
  } else {
    return p.getDefaultNodeStyle(props, node);
  }
}

/**
 * 点击树节点
 */
function _clickTreeNode(node) {
  if (p.isClickTreeNodeCollapsedWay(props)) {
    const collapsed = extra.getNodeRootCollapsed(node);
    collapseNode(node, !collapsed);
  }
}

/**
 * 点击连接节点
 */
function _clickKnotNode(node) {
  if (p.isClickKnotNodeCollapsedWay(props)) {
    const collapsed = extra.getNodeRootCollapsed(node);
    collapseNode(node, !collapsed);
  }
}

/**
 * 展开或折叠节点
 * @param {z*} node
 * @param {*} collapsed
 */
function collapseNode(node, collapsed) {
  draw.collapseNode(node, collapsed);
  _reDraw();
}

/**
 * 缩放
 * @param {*} ratio
 */
function zoom(ratio) {
  draw.zoom(treeRef.value, toRaw(zoomListner.value), ratio);
}

/**
 * 调整大小
 */
function reSize() {
  nextTick(() => {
    _reSize();
  });
}

defineExpose({
  collapseNode,
  zoom,
  reSize,
});
</script>

<template>
  <div
    :id="containerId"
    ref="treeRef"
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <svg width="100%" height="100%">
      <g :transform="transform">
        <!-- nodes -->
        <foreignObject
          v-for="(node, index) in nodes"
          :key="index"
          :x="draw.getNodeX(node, props)"
          :y="draw.getNodeY(node, props)"
          :width="node.xSize"
          height="1"
          :style="foreignObjectStyle"
          ref="root"
        >
          <div
            :style="nodeStyle"
            class="node-container"
            :class="nodeClass"
            :data-node-id="node.id"
            @click="() => _clickTreeNode(node)"
          >
            <slot name="node" :data="node.data" :index="index" :node="node">
              <DefaultNode
                :title="_getDefaultNodeTitle(node.data, index + 1)"
                :style="_getDefaultNodeStyle(node)"
              />
            </slot>
          </div>
        </foreignObject>
        <!-- lines -->
        <g
          :stroke="p.getLineStyle(props).stroke"
          :stroke-width="p.getLineStyle(props).strokeWidth"
          :stroke-opacity="p.getLineStyle(props).strokeOpacity"
          :stroke-dasharray="p.getLineStyle(props).strokeDasharray"
          fill="none"
        >
          <!-- node stretch lines -->
          <path
            v-for="(node, index) in stretchLines"
            :key="`node-stretch-link-${index}`"
            :d="draw.drawNodeStretchLine(node, props)"
            stroke-linecap="butt"
          />
          <!-- polyline lines -->
          <g v-if="p.isPolylineLink(props)">
            <path
              v-for="(node, index) in straightHLines"
              :key="`long-polyline-link-${index}`"
              :d="draw.drawLongPolyline(node, props)"
              stroke-linecap="square"
            />
            <path
              v-for="(link, index) in straightVLines"
              :key="`short-polyline-link-${index}`"
              :d="draw.drawShortPolyline(link, props)"
              stroke-linecap="butt"
            />
          </g>
          <!-- curve lines -->
          <g v-if="p.isCurveLink(props)">
            <path
              v-for="(link, index) in curveLines"
              :key="`curve-link-${index}`"
              :d="draw.drawCurveLine(link, props)"
              stroke-linecap="butt"
            />
          </g>
          <g v-if="showKnot">
            <!-- knot stretch lines -->
            <path
              v-for="(node, index) in knotStretchLines"
              :key="`knot-stretch-line-${index}`"
              :d="draw.drawKnotStretchLine(node, props)"
              :stroke="p.getLineStyle(props).stroke"
              :stroke-width="p.getLineStyle(props).strokeWidth"
              :stroke-opacity="p.getLineStyle(props).strokeOpacity"
              :stroke-dasharray="p.getLineStyle(props).strokeDasharray"
              stroke-linecap="butt"
              fill="none"
            />
            <foreignObject
              v-for="(node, index) in knots"
              :key="index"
              :x="draw.getKnotX(node, props)"
              :y="draw.getKnotY(node, props)"
              :width="extra.getKnotWidth(node)"
              :height="1"
              :style="foreignObjectStyle"
            >
              <div
                :style="nodeStyle"
                class="knot-container"
                :data-node-id="node.id"
                @click="() => _clickKnotNode(node)"
              >
                <slot name="knot" :data="node.data" :node="node" :index="index">
                  <DefaultKnot
                    :num="node.numChildren"
                    :collapsed="extra.getNodeRootCollapsed(node)"
                  />
                </slot>
              </div>
            </foreignObject>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
