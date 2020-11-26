const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
ctx.translate(canvas.width / 2, canvas.height / 2);
ctx.scale(1, -1);

class Vector2D {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  rotate(rad: number) {
    const c = Math.cos(rad),
      s = Math.sin(rad);
    const { x, y } = this;
    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
  copy() {
    return new Vector2D(this.x, this.y);
  }
  add(v: Vector2D) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
    return this;
  }
}

/**
 *
 * @param edges 边数
 * @param x 起点 x
 * @param y 起点 y
 * @param step 边的长度 step
 */
function regularShape(edges: number = 3, x: number, y: number, step: number) {
  const ret = [];
  const delta = Math.PI * (1 - (edges - 2) / edges);
  let p = new Vector2D(x, y);
  const dir = new Vector2D(step, 0);
  ret.push(p);
  for (let i = 0; i < edges; i++) {
    p = p.copy().add(dir.rotate(delta));
    ret.push(p);
  }
  return ret;
}

function draw(points: Vector2D[], strokeStyle = "black", fillStyle = null) {
  ctx.strokeStyle = strokeStyle;
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.closePath();
  if (fillStyle) {
    ctx.fillStyle = fillStyle!;
    ctx.fill();
  }
  ctx.stroke();
}

draw(regularShape(3, 128, 128, 100)); // 绘制三角形
draw(regularShape(6, -64, 128, 50)); // 绘制六边形
draw(regularShape(11, -64, -64, 30)); // 绘制十一边形
draw(regularShape(60, 128, -64, 6)); // 绘制六十边形
