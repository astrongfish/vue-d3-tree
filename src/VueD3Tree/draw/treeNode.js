import * as p from "../data/props";
import * as extra from "../data/extraData";

/**
 * 获取节点位置
 * @param {*} node 
 * @param {*} props 
 * @returns 
 */
const getNodePosition = (node, props) => {
  const hierarchyMargin = p.getHierarchyMargin(props);
  const {width, height} = extra.getNodeSize(node);
  return {
    width,
    height,
    nodeX: p.isVerticalDirection(props) ? node.x : node.y,
    nodeY: p.isVerticalDirection(props) ? node.y : node.x,
    nodeWidth: p.isVerticalDirection(props) ? width: height,
    nodeHeight: p.isVerticalDirection(props) ? height + hierarchyMargin : width + hierarchyMargin,
  }
};

/**
 * 查找某个节点所有子节点中, 最小、最大的x坐标
 *
 * @param {*} node
 */
const findLimitXOfChildren = (node, props) => {
  const xArray = node.children.map((item) => getNodePosition(item, props).nodeX);
  return {
    minX: Math.min(...xArray),
    maxX: Math.max(...xArray),
  };
};

/**
 * 查找某个节点所有子节点中, 最小、最大的Y坐标
 *
 * @param {*} node
 */
const findLimitYOfChildren = (node, props) => {
  const yArray = node.children.map((item) => getNodePosition(item, props).nodeY);
  return {
    minY: Math.min(...yArray),
    maxY: Math.max(...yArray),
  };
};

/**
 * 展开或折叠节点
 * @param {*} rootNode
 * @param {*} collapsed
 */
const collapseNode = (rootNode, collapsed) => {
  if (rootNode.hasChildren) {
    if (collapsed) {
      extra.setNodeRootCollapsed(rootNode, true);
      rootNode.descendants().forEach((node) => {
        if (rootNode.id !== node.id) {
          extra.setNodeCollapsed(node, true);
        }
      });
    } else {
      rootNode.descendants().forEach((node) => {
        extra.setNodeCollapsed(node, false);
        extra.setNodeRootCollapsed(node, false);
      });
    }
  }
};

export {
  collapseNode,
  getNodePosition,
  findLimitXOfChildren,
  findLimitYOfChildren,
};
