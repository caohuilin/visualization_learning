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

const canvas = document.querySelector("canvas")!;
const context = canvas.getContext("2d")!;

const TAU = 2 * Math.PI;
function draw(
  ctx: CanvasRenderingContext2D,
  node: d3.HierarchyCircularNode<Datum>,
  { fillStyle = "rgba(0, 0, 0, 0.2)", textColor = "white" } = {}
) {
  const children = node.children;
  const { x, y, r } = node;
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
  if (children) {
    for (let i = 0; i < children.length; i++) {
      draw(ctx, children[i]);
    }
  } else {
    const name = node.data.name;
    ctx.fillStyle = textColor;
    ctx.font = "1.5rem Arial";
    ctx.textAlign = "center";
    ctx.fillText(name, x, y);
  }
}

draw(context, root);

function clearCircle(x: number, y: number, r: number) {
  context.save();
  context.fillStyle = "rgba(255,255,255,255)";
  context.beginPath();
  context.arc(x, y, r, 0, TAU);
  context.fill();
  context.restore();
}

let activeNode: d3.HierarchyCircularNode<Datum> | null = null;

function clearActiveNode() {
  if (activeNode) {
    clearCircle(activeNode.x, activeNode.y, activeNode.r);
    draw(context, activeNode, {
      fillStyle: "rgba(0,0,0,0.5)",
      textColor: "white",
    });
  }
}
function handleOverCircle(
  ctx: CanvasRenderingContext2D,
  mx: number,
  my: number,
  node: d3.HierarchyCircularNode<Datum>
) {
  const children = node.children;
  if (children) {
    let flag = false;
    for (let i = 0; i < children.length; i++) {
      const inCircle = handleOverCircle(ctx, mx, my, children[i]);
      if (inCircle) {
        flag = true;
      }
    }
    return flag;
  } else {
    const { x, y, r } = node;
    if ((my - y) * (my - y) + (mx - x) * (mx - x) < r * r) {
      if (activeNode && activeNode.data.name === node.data.name) {
        return true;
      }
      clearActiveNode();
      activeNode = node;
      clearCircle(x, y, r);
      draw(context, activeNode, {
        fillStyle: "rgba(255,0,0,0.2)",
        textColor: "white",
      });
      return true;
    }
  }
}

canvas.addEventListener("mousemove", (e) => {
  const x = e.clientX * 2;
  const y = e.clientY * 2;
  const inCircle = handleOverCircle(context, x, y, root);
  if (!inCircle) {
    clearActiveNode();
  }
});
