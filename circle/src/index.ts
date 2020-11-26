const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, -1);

const TAU_SEGMENTS = 60;
const TAU = Math.PI * 2;

/**
 * 圆参数方程
 * @param x0 起始位置 x
 * @param y0 起始位置 y
 * @param radius 圆半径
 * @param startAng 开始角度
 * @param endAng 结束角度
 */
function arc(
  x0: number,
  y0: number,
  radius: number,
  startAng = 0,
  endAng = Math.PI * 2
) {
  const ang = Math.min(TAU, endAng - startAng);
  const ret: [number, number][] = ang === TAU ? [] : [[x0, y0]];
  const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
  for (let i = 0; i <= segments; i++) {
    const x = x0 + radius * Math.cos(startAng + (ang * i) / segments);
    const y = y0 + radius * Math.sin(startAng + (ang * i) / segments);
    ret.push([x, y]);
  }
  return ret;
}

/**
 * 椭圆参数方程
 * @param x0 起始位置 x
 * @param y0 起始位置 y
 * @param radiusX x 轴方向半径
 * @param radiusY y 轴方向半径
 * @param startAng 开始角度
 * @param endAng 结束角度
 */
function ellipse(
  x0: number,
  y0: number,
  radiusX: number,
  radiusY: number,
  startAng = 0,
  endAng = Math.PI * 2
) {
  const ang = Math.min(TAU, endAng - startAng);
  const ret: [number, number][] = ang === TAU ? [] : [[x0, y0]];
  const segments = Math.round((TAU_SEGMENTS * ang) / TAU);
  for (let i = 0; i <= segments; i++) {
    const x = x0 + radiusX * Math.cos(startAng + (ang * i) / segments);
    const y = y0 + radiusY * Math.sin(startAng + (ang * i) / segments);
    ret.push([x, y]);
  }
  return ret;
}

const LINE_SEGMENTS = 60;

/**
 * 抛物线参数方程
 * @param x0 起始位置 x
 * @param y0 起始位置 y
 * @param p 常数，焦点到准线的距离
 * @param min 最小值
 * @param max 最大值
 */
function parabola(x0: number, y0: number, p: number, min: number, max: number) {
  const ret: [number, number][] = [];
  for (let i = 0; i <= LINE_SEGMENTS; i++) {
    const s = i / 60;
    const t = min * (1 - s) + max * s;
    const y = x0 + 2 * p * t ** 2;
    const x = y0 + 2 * p * t;
    ret.push([x, y]);
  }
  return ret;
}

function draw(
  points: [number, number][],
  strokeStyle = "black",
  fillStyle = null
) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(...points[i]);
  }
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle!;
    ctx.fill();
  }
  ctx.stroke();
}

draw(arc(0, 0, 100));
draw(ellipse(0, 0, 100, 50));
draw(ellipse(0, 0, 50, 100));
draw(parabola(0, 0, 10, -20, 10));
