import * as uuid from "uuid";
import * as d3 from "d3";
import * as extra from "../data/extraData";
import { flextree } from "d3-flextree";
import * as p from "../data/props";
import * as treeNode from "./treeNode";
import * as knotNode from "./knotNode";
import * as linkLine from "./linkLine";

const getCenterOffsetX = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.width / 2;
};

const getCenterOffsetY = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.height / 2;
};

/**
 * d3 拖拽缩放
 * @param {*} props
 * @param {*} element
 * @param {*} callback
 */
const zoomListner = (props, element, callback) => {
  const zoomListner = d3
    .zoom()
    .scaleExtent([0.2, 3])
    .on("zoom", (e) => {
      if (callback) callback(e);
    });

  const zoom = d3.select(element).call(zoomListner);
  zoom.on("dblclick.zoom", null);
  if (!props.wheelZoom) {
    zoom.on("wheel.zoom", null);
  }

  return zoomListner;
};

/**
 * 重新调整位置
 * @param {*} props 
 * @param {*} element 
 */
const rePosition = (props, element, zoomListner) => {
  let translateX = p.getLeft(props) === 'center' ? getCenterOffsetX(element) : p.getLeft(props);
  let translateY = p.getTop(props) === 'center' ? getCenterOffsetY(element) : p.getTop(props);
  d3.select(element)
    .transition()
    .call(
      zoomListner.transform,
      d3.zoomIdentity.translate(translateX, translateY)
    );
}

/**
 * 手动缩放
 * @param {*} element
 * @param {*} zoomListner
 * @param {*} ratio
 */
const zoom = (element, zoomListner, ratio) => {
  d3.select(element).transition().call(zoomListner.scaleTo, ratio);
};

/**
 * 查询连接线的源节点
 * @param {*} links
 */
const findLinkSources = (links) => {
  const allSources = links.map((link) => link.source);
  let sources = [];
  allSources.forEach((source) => {
    if (sources.every((s) => s.id != source.id)) {
      sources.push(source);
    }
  });
  return sources;
};

const draw = (treeData, props) => {
  const { neighborMargin } = props;
  const layout = flextree({
    children: (data) => {
      return p.getChildrenData(props, data);
    },
    nodeSize: (node) => {
      const { nodeWidth, nodeHeight } = treeNode.getNodePosition(node, props)
      return [nodeWidth, nodeHeight]
    },
    spacing: (nodeA, nodeB) => {
      return neighborMargin || Math.pow(nodeA.path(nodeB).length, 2);
    },
  });
  const tree = layout.hierarchy(treeData);
  layout(tree);
  const descendants = tree.descendants();
  //树节点
  const nodes = descendants
    .filter((node) => !extra.getNodeCollapsed(node))
    .map((node) => {
      node.id = uuid.v4();
      return node;
    });
  const links = tree.links();
  //所有连接源节点
  const linkSources = findLinkSources(links);
  //节点延长线
  const stretchLines = linkSources.filter((node) => {
    let result = true;
    if (p.isClickTreeNodeCollapsedWay(props)) {
      result =
        !extra.getNodeRootCollapsed(node) && !extra.getNodeCollapsed(node);
    }
    if (p.isClickKnotNodeCollapsedWay(props)) {
      result = !extra.getNodeCollapsed(node);
    }
    return result;
  });
  //横向直线连接线
  const straightHLines = linkSources.filter(
    (node) => !extra.getNodeCollapsed(node) && !extra.getNodeRootCollapsed(node)
  );
  //竖向直线连接线
  const straightVLines = links.filter(
    ({ target }) => !extra.getNodeCollapsed(target)
  );
  //曲线连接线
  const curveLines = straightVLines;
  //连接节点
  const knots = stretchLines;
  //连接点延长线
  const knotStretchLines = straightHLines;
  return {
    nodes,
    stretchLines,
    straightHLines,
    straightVLines,
    curveLines,
    knots,
    knotStretchLines,
  };
};

/**
 * 根据dom元素实际尺寸调整节点的尺寸
 * @param {*} nodes
 * @param {*} scale
 */
const reSize = (nodes, scale, nodeClass) => {
  document.querySelectorAll(`.${nodeClass}`).forEach((element) => {
    if(element){
      const rect = element.getBoundingClientRect();
      const nodeId = element.dataset.nodeId;
      const node = nodes.find((node) => node.id === nodeId);
      if (node) {
        extra.setNodeWidth(node, rect.width / scale);
        extra.setNodeHeight(node, rect.height / scale);
      }
    }
  });

  document.querySelectorAll(".knot-container").forEach((element) => {
    if(element){
      const rect = element.getBoundingClientRect();
      const nodeId = element.dataset.nodeId;
      const node = nodes.find((node) => node.id === nodeId);
      extra.setKnotWidth(node, rect.width / scale);
      extra.setKnotHeight(node, rect.height / scale);
    }
  });
};

//展开、折叠节点
export const collapseNode = treeNode.collapseNode;
//树节点x坐标
export const getNodeX = (node, props) => {
  const { nodeX, width } = treeNode.getNodePosition(node, props)
  return nodeX - width / 2;
}
//树节点y坐标
export const getNodeY = (node, props) => {
  const { nodeY, height } = treeNode.getNodePosition(node, props)
  return nodeY - height / 2
};

//连接节点x坐标
export const getKnotX = knotNode.getKnotX;
//连接节点y坐标
export const getKnotY = knotNode.getKnotY;

//折线连接线--长线
export const drawLongPolyline = linkLine.drawLongPolyline;
//折线连接线--短线
export const drawShortPolyline = linkLine.drawShortPolyline;
//曲线连接线
export const drawCurveLine = linkLine.drawCurveLine;
//树节点延长线
export const drawNodeStretchLine = linkLine.drawNodeStretchLine;
//连接节点延长线
export const drawKnotStretchLine = linkLine.drawKnotStretchLine;

export { draw, reSize, rePosition, zoom, zoomListner };
