const DIRECTION_VERTICAL = "vertical";
const DIRECTION_HORIZONTAL = "horizontal";

const LINETYPE_CURVE = "curve";
const LINETYPE_POLYLINE = "polyline";
const LINETYPE_STRAIGHT = "straight";

const COLLAPSEDTYPE_TREE_NODE = "clickTreeNode";
const COLLAPSEDTYPE_KNOT_NODE = "clickKnotNode";

const clickStyle = {
  cursor: "pointer",
};

const defaultNodeStyle = {
  width: "80px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "1px solid gray",
  borderRadius: "5px",
};

/**
 * 默认属性
 */
const defaultProps = {
  direction: DIRECTION_VERTICAL,
  hierarchyMargin: 60,
  neighborMargin: 20,
  stretchLength: 10,
  showKnot: false,
  knotStretchLength: 5,
  childrenKey: "children",
  wheelZoom: true,
  lineType: LINETYPE_POLYLINE,
  lineStyle: {
    stroke: "gray",
    strokeDasharray: "none",
    strokeOpacity: 1,
    strokeWidth: 1,
  },
  defaultNodeStyle,
  defaultNodeCollapsedStyle: {
    ...defaultNodeStyle,
    border: "1px dashed gray",
    color: "gray",
  },
};

const validProps = {
  id: String,
  data: Object,
  direction: {
    type: [String],
    default: defaultProps.direction
  },
  top: {
    type: [String, Number],
  },
  left: {
    type: [String, Number],
  },
  hierarchyMargin: {
    type: Number,
    default: defaultProps.hierarchyMargin,
  },
  neighborMargin: {
    type: Number,
    default: defaultProps.neighborMargin,
  },
  stretchLength: {
    type: Number,
    default: defaultProps.stretchLength,
  },
  showKnot: {
    type: Boolean,
    default: defaultProps.showKnot,
  },
  knotStretchLength: {
    type: Number,
    default: defaultProps.knotStretchLength,
  },
  childrenKey: {
    type: [String, Function],
    default: defaultProps.childrenKey,
  },
  wheelZoom: {
    type: Boolean,
    default: defaultProps.wheelZoom,
  },
  lineType: {
    type: String,
    default: defaultProps.lineType,
  },
  lineStyle: {
    type: Object,
    default: defaultProps.lineStyle,
  },
  //默认节点显示用户数据的key
  defaultNodeKey: {
    type: [String, Function],
  },
  //默认节点样式
  defaultNodeStyle: {
    type: [Object, Function],
    default: defaultProps.defaultNodeStyle,
  },
  //默认节点折叠样式
  defaultNodeCollapsedStyle: {
    type: [Object, Function],
    default: defaultProps.defaultNodeCollapsedStyle,
  },
  //展开方式
  collapsedWay: {
    type: String,
  },
};

const isFunction = (value) => typeof value === "function";

/**
 * 左边距
 * @param {*} props 
 * @returns 
 */
const getLeft = props => {
  return props.left || (isVerticalDirection(props) ? "center" : 100)
}

/**
 * 左边距
 * @param {*} props 
 * @returns 
 */
const getTop = props => {
  return props.top || (isVerticalDirection(props) ? 60 : "center")
}

/**
 * 获取数据中子节点的属性值
 * @param {*} props 
 * @param {*} data 
 * @returns 
 */
const getChildrenData = (props, data) => {
 return isFunction(props.childrenKey)
    ? props.childrenKey(data)
    : data[props.childrenKey];
}

/**
 * 默认节点的样式
 * @param {*} props 
 * @param {*} item 
 * @returns 
 */
const getDefaultNodeStyle = (props, item) => {
  const nodeStyle = isFunction(props.defaultNodeStyle)
    ? props.defaultNodeStyle(item)
    : ( props.defaultNodeStyle || defaultProps.defaultNodeStyle );
  return isClickTreeNodeCollapsedWay(props)
    ? { ...nodeStyle, ...clickStyle }
    : nodeStyle;
};

/**
 * 默认节点折叠样式
 * @param {*} props 
 * @param {*} item 
 * @returns 
 */
const getDefaultNodeCollapsedStyle = (props, item) => {
  const nodeStyle = isFunction(props.defaultNodeCollapsedStyle)
    ? props.defaultNodeStyle(item)
    : (props.defaultNodeCollapsedStyle || defaultProps.defaultNodeCollapsedStyle);
  return isClickTreeNodeCollapsedWay(props)
    ? { ...nodeStyle, ...clickStyle }
    : nodeStyle;
};

/**
 * 默认节点数据key
 * @param {*} props 
 * @returns 
 */
const getDefaultNodeKey = (props, data) => {
  if(isFunction(props.defaultNodeKey)){
    return data ? props.defaultNodeKey(data) : ""
  }
  return data ? data[props.defaultNodeKey] : ""
};

/**
 * 是否水平方向布局
 * @param {*} props 
 * @returns 
 */
const isVerticalDirection = props => props.direction === DIRECTION_VERTICAL
/**
 * 是否水平方向布局
 * @param {*} props 
 * @returns 
 */
const isHorizontalDirection = props => props.direction === DIRECTION_HORIZONTAL


/**
 * 是否直线连接线
 * @param {*} props 
 * @returns 
 */
const isStraightLink = (props) => props.lineType === LINETYPE_STRAIGHT;
/**
 * 是否曲线连接线
 * @param {*} props 
 * @returns 
 */
const isCurveLink = (props) => props.lineType === LINETYPE_CURVE;
/**
 * 是否直角折线连接线
 * @param {*} props 
 * @returns 
 */
const isPolylineLink = props => props.lineType === LINETYPE_POLYLINE;


/**
 * 点击树节点展开、收起
 * @param {*} props 
 * @returns 
 */
const isClickTreeNodeCollapsedWay = (props) =>
  props.collapsedWay === COLLAPSEDTYPE_TREE_NODE;
/**
 * 点击连接节点展开、收起
 * @param {*} props 
 * @returns 
 */
const isClickKnotNodeCollapsedWay = (props) =>
  props.collapsedWay === COLLAPSEDTYPE_KNOT_NODE;

/**
 * 层级间距
 * @param {*} props 
 * @returns 
 */
const getHierarchyMargin = props => props.hierarchyMargin || defaultProps.hierarchyMargin

/**
 * 连线样式
 * @param {*} props 
 * @returns 
 */
const getLineStyle = props => props.lineStyle || defaultProps.lineStyle

export {
  defaultProps,
  validProps,
  getLeft,
  getTop,
  getLineStyle,
  getHierarchyMargin,
  isVerticalDirection,
  isHorizontalDirection,
  isCurveLink,
  isPolylineLink,
  isStraightLink,
  getChildrenData,
  getDefaultNodeKey,
  getDefaultNodeStyle,
  getDefaultNodeCollapsedStyle,
  isClickTreeNodeCollapsedWay,
  isClickKnotNodeCollapsedWay,
};
