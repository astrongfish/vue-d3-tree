import * as d3 from "d3";
import * as p from "../data/props";
import * as extra from "../data/extraData";
import * as treeNode from "./treeNode";

/**
 * 画直线
 * @param {*} startPoint 起点
 * @param {*} endPoint  终点
 * @returns
 */
const drawLine = (startPoint, endPoint) => {
  const path = d3.path();
  path.moveTo(startPoint[0], startPoint[1]);
  path.lineTo(endPoint[0], endPoint[1]);
  return path.toString();
};

/**
 * 画贝塞尔曲线
 * @param {*} p0 
 * @param {*} p1 
 * @param {*} p2 
 * @param {*} p3 
 */
const drawBezierCurve = (p0, p1, p2, p3) => {
  const path = d3.path();
  path.moveTo(p0[0], p0[1]);
  path.bezierCurveTo(
    p1[0], p1[1],
    p2[0], p2[1],
    p3[0],p3[1]
  );
  return path.toString();
}

/**
 * 获取连接节点的总长度
 * @param {*} node
 * @param {*} props
 */
const getKnotTotalLength = (node, props) => {
  let totalLength = 0;
  if (props.showKnot) {
    const knotLength = p.isVerticalDirection(props)
      ? extra.getKnotHeight(node)
      : extra.getKnotWidth(node);
    totalLength = knotLength + props.knotStretchLength;
  }
  return totalLength;
};


/**
 * 折线连接线--长线--横线
 *
 * @param {*} link
 * @param {*} props
 */
const drawHLongPolyline = (node, props) => {
  const { stretchLength } = props;
  const { nodeY, height } = treeNode.getNodePosition(node, props);
  const { minX, maxX } = treeNode.findLimitXOfChildren(node, props);
  const knotTotalLength = getKnotTotalLength(node, props);

  const p0 = [minX, nodeY + height / 2 + stretchLength + knotTotalLength];
  const p1 = [maxX, p0[1]];

  return drawLine(p0, p1);
};

/**
 * 折线连接线--长线--竖线
 *
 * @param {*} link
 * @param {*} props
 */
const drawVLongPolyline = (node, props) => {
  const { stretchLength } = props;
  const { nodeX, width, height } = treeNode.getNodePosition(
    node,
    props
  );
  const { minY, maxY } = treeNode.findLimitYOfChildren(node, props);
  const knotTotalLength = getKnotTotalLength(node, props);

  const p0 = [
    nodeX + width / 2 + stretchLength + knotTotalLength,
    minY,
  ];
  const p1 = [p0[0], maxY];

  return drawLine(p0, p1);
};

/**
 * 画折线连接线--长线
 * @param {*} node
 * @param {*} props
 */
const drawLongPolyline = (node, props) => {
  if (p.isVerticalDirection(props)) {
    return drawHLongPolyline(node, props);
  } else {
    return drawVLongPolyline(node, props);
  }
};

/**
 * 折线连接线--短线--横线
 *
 * @param {*} link
 * @param {*} props
 * @returns
 */
const drawHShortPolyline = (link, props) => {
  const { source, target } = link;
  const { stretchLength } = props;

  const sourcePosition = treeNode.getNodePosition(source, props);
  const targetPosition = treeNode.getNodePosition(target, props);
  const knotTotalLength = getKnotTotalLength(source, props);

  const marginLength =
    targetPosition.nodeX -
    sourcePosition.nodeX - 
    sourcePosition.width / 2 -
    stretchLength -
    knotTotalLength;

  const p0 = [
    targetPosition.nodeX - marginLength,
    targetPosition.nodeY,
  ];
  const p1 = [targetPosition.nodeX - targetPosition.width / 2, p0[1]];

  return drawLine(p0, p1);
};

/**
 * 折线连接线--短线--竖线
 *
 * @param {*} link
 * @param {*} props
 * @returns
 */
const drawVShortPolyline = (link, props) => {
  const { source, target } = link;
  const { stretchLength } = props;

  const sourcePosition = treeNode.getNodePosition(source, props);
  const targetPosition = treeNode.getNodePosition(target, props);
  const knotTotalLength = getKnotTotalLength(source, props);

  const marginLength =
    targetPosition.nodeY -
    sourcePosition.nodeY -
    sourcePosition.height / 2 -
    stretchLength -
    knotTotalLength;

  const p0 = [targetPosition.nodeX, targetPosition.nodeY - marginLength];
  const p1 = [p0[0], targetPosition.nodeY - targetPosition.height /2];

  return drawLine(p0, p1);
};

/**
 * 折线连接线--短线
 * @param {*} node
 * @param {*} props
 */
const drawShortPolyline = (node, props) => {
  if (p.isVerticalDirection(props)) {
    return drawVShortPolyline(node, props);
  } else {
    return drawHShortPolyline(node, props);
  }
};

/**********************Curve Link****************************/

/**
 * 画曲线连接线--竖向
 *
 * @param {*} link
 * @param {*} props
 */
const drawVCurveLine = (link, props) => {
  const { source, target } = link;
  const { stretchLength } = props;

  const sourcePosition = treeNode.getNodePosition(source, props)
  const targetPosition = treeNode.getNodePosition(target, props)
  const knotLength = getKnotTotalLength(source, props)

  const sp = [sourcePosition.nodeX, sourcePosition.nodeY + sourcePosition.height / 2 + stretchLength + knotLength];
  const ep = [targetPosition.nodeX, targetPosition.nodeY - targetPosition.height / 2]
  const k = Math.abs(ep[1] - sp[1]);
  const cp1 = [sp[0], sp[1] + k / 2]
  const cp2 = [ep[0], ep[1] - k /2]

  return drawBezierCurve(sp, cp1, cp2, ep)
};

/**
 * 画曲线连接线--横向
 *
 * @param {*} link
 * @param {*} props
 */
const drawHCurveLine = (link, props) => {
  const { source, target } = link;
  const { stretchLength } = props;

  const sourcePosition = treeNode.getNodePosition(source, props)
  const targetPosition = treeNode.getNodePosition(target, props)
  const knotLength = getKnotTotalLength(source, props)

  const sp = [
    sourcePosition.nodeX + sourcePosition.width / 2 + stretchLength + knotLength, 
    sourcePosition.nodeY
  ];
  const ep = [
    targetPosition.nodeX - targetPosition.width / 2, 
    targetPosition.nodeY
  ]
  const k = Math.abs(sp[0] - ep[0]);

  const cp1 = [sp[0] + k / 2, sp[1]]

  const cp2 = [ep[0] - k /2, ep[1]]

  return drawBezierCurve(sp, cp1, cp2, ep)
};

/**
 * 画曲线连接线
 *
 * @param {*} link
 * @param {*} props
 */
const drawCurveLine = (link, props) => {
  return p.isVerticalDirection(props)
  ? drawVCurveLine(link, props)
  : drawHCurveLine(link, props);
};


/**********************Node Stretch Line****************************/

/**
 * 画树节点延长线--垂直方向
 * @param {*} node 连接线的源节点
 * @param {*} props 属性
 */
const drawVNodeStretchLine = (sourceNode, props) => {
  const { nodeX, nodeY, height } = treeNode.getNodePosition(
    sourceNode,
    props
  );

  const p0 = [nodeX, nodeY + height / 2];
  const p1 = [p0[0], p0[1] + props.stretchLength];

  return drawLine(p0, p1);
};

/**
 * 画树节点延长线--水平方向
 * @param {*} node 连接线的源节点
 * @param {*} props 属性
 */
const drawHNodeStretchLine = (sourceNode, props) => {
  const { nodeX, nodeY, width } = treeNode.getNodePosition(
    sourceNode,
    props
  );

  const p0 = [nodeX + width / 2, nodeY];
  const p1 = [p0[0] + props.stretchLength, p0[1]];

  return drawLine(p0, p1);
};

/**
 * 画树节点延长线
 * @param {*} node 连接线的源节点
 * @param {*} props 属性
 */
const drawNodeStretchLine = (sourceNode, props) => {
  return p.isVerticalDirection(props)
    ? drawVNodeStretchLine(sourceNode, props)
    : drawHNodeStretchLine(sourceNode, props);
};


/**********************Knot Stretch Line****************************/


/**
 * 画knot节点延长线--竖线
 * @param {*} node 连接线的源节点
 * @param {*} props 属性
 */
const drawVKnotStretchLine = (sourceNode, props) => {
  const { stretchLength, knotStretchLength } = props;
  const knotheight = extra.getKnotHeight(sourceNode);
  const { nodeX, nodeY, height } = treeNode.getNodePosition(sourceNode, props);

  const p0 = [
    nodeX,
    nodeY + height / 2 + stretchLength + knotheight,
  ];
  const p1 = [p0[0], p0[1] + knotStretchLength];

  return drawLine(p0, p1)
};

/**
 * 画knot节点延长线--横线
 * @param {*} node 连接线的源节点
 * @param {*} props 属性
 */
const drawHKnotStretchLine = (sourceNode, props) => {
  const { stretchLength, knotStretchLength } = props;
  const knotWidth = extra.getKnotWidth(sourceNode);
  const { nodeX, nodeY, width } = treeNode.getNodePosition(sourceNode, props);

  const p0 = [
    nodeX + width / 2 + stretchLength + knotWidth,
    nodeY,
  ];
  const p1 = [p0[0] + knotStretchLength, p0[1]];

  return drawLine(p0, p1)
};

/**
 * 画knot节点延长线
 * @param {*} node 连接线的源节点
 * @param {*} props 属性
 */
const drawKnotStretchLine = (sourceNode, props) => {
  return p.isVerticalDirection(props)
  ? drawVKnotStretchLine(sourceNode, props)
  : drawHKnotStretchLine(sourceNode, props);
};

export {
  drawNodeStretchLine,
  drawKnotStretchLine,
  drawLongPolyline,
  drawShortPolyline,
  drawCurveLine,
};
