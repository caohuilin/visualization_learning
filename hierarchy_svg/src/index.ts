import * as d3 from "d3";
import { hierarchy } from "d3-hierarchy";

import data from "./data.json";

interface Datum {
  name: string;
}
// 使用 hierarchy 进行数据转换
const regions: d3.HierarchyNode<Datum> = hierarchy(data)
  .sum(() => 1)
  .sort((a: any, b: any) => b.value - a.value);
const pack = d3.pack<Datum>().size([1600, 1600]).padding(3);
const root: d3.HierarchyCircularNode<Datum> = pack(regions);

const svgroot = document.querySelector("svg")!;

function draw(
  parent: SVGGraphicsElement,
  node: d3.HierarchyCircularNode<Datum>,
  { fillStyle = "rgba(0, 0, 0, 0.2)", textColor = "white" } = {}
) {
  const children = node.children;
  const { x, y, r } = node;
  const circle = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circle.setAttribute("cx", String(x));
  circle.setAttribute("cy", String(y));
  circle.setAttribute("r", String(r));
  circle.setAttribute("fill", fillStyle);
  circle.setAttribute("data-name", node.data.name);
  parent.appendChild(circle);
  if (children) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("data-name", node.data.name);
    for (let i = 0; i < children.length; i++) {
      draw(group, children[i], { fillStyle, textColor });
    }
    parent.appendChild(group);
  } else {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("fill", textColor);
    text.setAttribute("font-family", "Arial");
    text.setAttribute("font-size", "1.5rem");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("x", String(x));
    text.setAttribute("y", String(y));
    const name = node.data.name;
    text.textContent = name;
    parent.appendChild(text);
  }
}

draw(svgroot, root);

function getTitle(target: SVGGraphicsElement) {
  const name = target.getAttribute("data-name");
  if (target.parentNode && target.parentNode.nodeName === "g") {
    const parentName = (target.parentNode as SVGGraphicsElement).getAttribute(
      "data-name"
    );
    return `${parentName}-${name}`;
  }
  return name;
}

let activeTarget: SVGGraphicsElement | null = null;
svgroot.addEventListener("mousemove", (evt) => {
  let target = evt.target as SVGGraphicsElement;
  if (target.nodeName === "text") {
    target = target.parentNode as SVGGraphicsElement;
  }
  if (activeTarget !== target) {
    if (activeTarget) activeTarget.setAttribute("fill", "rgba(0, 0, 0, 0.2)");
  }
  target.setAttribute("fill", "rgba(255, 0, 0, 0.2)");
  const titleEl = document.getElementById("title")!;
  titleEl.textContent = getTitle(target);
  activeTarget = target;
});
