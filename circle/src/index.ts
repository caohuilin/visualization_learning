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
  ctx: CanvasRenderingContext2D,
  { strokeStyle = "black", fillStyle = null, close = false } = {}
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

// draw(arc(0, 0, 100), ctx);
// draw(ellipse(0, 0, 100, 50), ctx);
// draw(ellipse(0, 0, 50, 100), ctx);
// draw(parabola(0, 0, 10, -10, 10), ctx);

/**
 * 根据参数方程生成曲线方程
 * @param xFunc x 计算函数
 * @param yFunc y 计算函数
 */
export function parametric(
  xFunc: (t: number, ...args: any[]) => number,
  yFunc: (t: number, ...args: any[]) => number
) {
  return function (start: number, end: number, seg = 100, ...args: any[]) {
    const points: [number, number][] = [];
    for (let i = 0; i <= seg; i++) {
      const p = i / seg;
      const t = start * (1 - p) + end * p;
      const x = xFunc(t, ...args); // 计算参数方程组的x
      const y = yFunc(t, ...args); // 计算参数方程组的y
      points.push([x, y]);
    }
    return { draw: draw.bind(null, points), points };
  };
}

const para = parametric(
  (t) => 25 * t,
  (t) => 25 * t ** 2
); // 绘制抛物线
para(-5.5, 5.5).draw(ctx);

const helical = parametric(
  (t, l) => l * t * Math.cos(t),
  (t, l) => l * t * Math.sin(t)
);
helical(0, 50, 500, 5).draw(ctx, { strokeStyle: "blue" });

const star = parametric(
  (t, l) => l * Math.cos(t) ** 3,
  (t, l) => l * Math.sin(t) ** 3
);
star(0, Math.PI * 2, 50, 150).draw(ctx, { strokeStyle: "red" });
