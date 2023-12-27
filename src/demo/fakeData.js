export const fakeData1 = {
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
};

export const fakeData3 = {
  name: "食物",
  children: [
    { name: "水果", children: [{ name: "苹果" }, { name: "橘子" }] },
    { name: "蔬菜" },
    { name: "粮食" },
    { name: "饮料" },
    { name: "零食" },
  ],
};

export const fakeData2 = {
  name: "食物",
  children: [
    { name: "水果", children: [{ name: "苹果" }, { name: "橘子" }] },
    { name: "蔬菜", children: [{ name: "黄瓜" }, { name: "萝卜" }] },
    { name: "粮食" },
  ],
};

export const customData = {
  name: "食物",
  children: [{ name: "水果" }, { name: "蔬菜" }],
};

export const linkStyle1 = {
  stroke: "red",
  strokeDasharray: "none",
  strokeOpacity: 1,
  strokeWidth: 3,
};

export const linkStyle2 = {
  stroke: "green",
  strokeDasharray: "none",
  strokeOpacity: 1,
  strokeWidth: 2,
};

export const nodeStyle1 = {
  width: "60px",
  height: "30px",
  borderColor: "red",
  backgroundColor: "green",
  color: "#fff",
  textAlign: "center",
  lineHeight: "30px",
};

export const collapsedNodeStyle1 = {
  ...nodeStyle1,
  border: "1px dashed red",
  color: "blue",
};

const nodeColor = {
  食物: "blue",
  水果: "red",
  蔬菜: "green",
};

export function FunNodeStyle({ data }) {
  return {
    width: "60px",
    height: "30px",
    backgroundColor: nodeColor[data.name] || "gray",
    color: "#fff",
    textAlign: "center",
    lineHeight: "30px",
  };
}
