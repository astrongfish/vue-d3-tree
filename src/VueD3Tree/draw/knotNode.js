import * as p from "../data/props";
import * as treeNode from "./treeNode";
import * as extra from "../data/extraData";

/**
 * 计算knot节点的x坐标
 * @param {*} node
 * @param {*} props
 */
const getKnotX = (node, props) => {
  const { nodeX, width } = treeNode.getNodePosition(node, props);
  const knotWidth = extra.getKnotWidth(node);
  return  p.isVerticalDirection(props) ? nodeX - knotWidth / 2 : nodeX + width / 2 + props.stretchLength
};

/**
 * 计算knot节点的y坐标
 * @param {*} node
 * @param {*} props
 */
const getKnotY = (node, props) => {
  const { stretchLength } = props;
  const { nodeY, height } = treeNode.getNodePosition(node, props);
  const knotHeight = extra.getKnotHeight(node);
  return  p.isVerticalDirection(props) ? nodeY + height / 2 + stretchLength : nodeY - knotHeight / 2
};

export { getKnotX, getKnotY };
