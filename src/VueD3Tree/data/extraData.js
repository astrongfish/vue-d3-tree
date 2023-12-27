/**
 * 扩展的信息
 *
 * _vue_d3_tree_extra = {
 *     nodeWidth: 10,     //tree node width
 *     nodeHeight: 10,    //tree node height
 *     knotWidth: 5,      //kont node width
 *     knotheight: 5      //knot node height
 *     collapsed: false   //is collapsed node
 *     rootCollapsed: false //is collapsed root node
 * }
 */

const extraPropName = "_vue_d3_tree_extra";
const nodeCollapsedPropName = "collapsed";
const nodeRootCollapsedPropName = "rootCollapsed";
const nodeWidthPropName = "nodeWidth";
const nodeHeightPropName = "nodeHeight";
const knotWidthPropName = "knotWidth";
const knotHeightPropName = "knotheight";

const setExtraProp = (node, name, val) => {
  if(!node) return;
  if (!node.data[extraPropName]) {
    node.data[extraPropName] = {};
  }
  node.data[extraPropName][name] = val;
  return node;
};

const getExtraProp = (node) => {
  return node.data[extraPropName] || {};
};

export const setNodeCollapsed = (node, collapsed) => {
  return setExtraProp(node, nodeCollapsedPropName, collapsed);
};

export const getNodeCollapsed = (node) => {
  const extraNode = getExtraProp(node);
  return extraNode[nodeCollapsedPropName] || false;
};

export const setNodeRootCollapsed = (node, collapsed) => {
  return setExtraProp(node, nodeRootCollapsedPropName, collapsed);
};

export const getNodeRootCollapsed = (node) => {
  const extraNode = getExtraProp(node);
  return extraNode[nodeRootCollapsedPropName] || false;
};

export const setNodeWidth = (node, width) => {
  return setExtraProp(node, nodeWidthPropName, width);
};

export const setNodeHeight = (node, height) => {
  return setExtraProp(node, nodeHeightPropName, height);
};

export const setKnotWidth = (node, width) => {
  return setExtraProp(node, knotWidthPropName, width);
};

export const setKnotHeight = (node, height) => {
  return setExtraProp(node, knotHeightPropName, height);
};

export const getNodeWidth = (node) => {
  const extraNode = getExtraProp(node);
  return extraNode[nodeWidthPropName] || 0;
};

export const getNodeHeight = (node) => {
  const extraNode = getExtraProp(node);
  return extraNode[nodeHeightPropName] || 0;
};

export const getKnotWidth = (node) => {
  const extraNode = getExtraProp(node);
  return extraNode[knotWidthPropName] || 0;
};

export const getKnotHeight = (node) => {
  const extraNode = getExtraProp(node);
  return extraNode[knotHeightPropName] || 0;
};

export const getNodeSize = node => {
  const extraNode = getExtraProp(node);
  return {
    width: extraNode[nodeWidthPropName] || 0,
    height: extraNode[nodeHeightPropName] || 0
  }
}