const canvas = document.querySelector("canvas")!;
// 转换坐标系 方便计算坐标
const ctx = canvas.getContext("2d")!;
ctx.translate(0, canvas.height);
ctx.scale(1, -1);
ctx.lineCap = "round";

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
  scale(length: number) {
    this.x *= length;
    this.y *= length;
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
 * @param context Canvas2D 上下文
 * @param v0 起始向量
 * @param length 当前树枝的长度
 * @param thickness 当前树枝的粗细
 * @param dir 当前树枝的方向，用与 x 轴的夹角表示，单位是弧度
 * @param bias 一个随机偏向因子，用来让树枝的朝向有一定的随机性
 */
function drawBranch(
  context: CanvasRenderingContext2D,
  v0: Vector2D,
  length: number,
  thickness: number,
  dir: number,
  bias: number
) {
  const v = new Vector2D(1, 0).rotate(dir).scale(length);
  const v1 = v0.copy().add(v);
  context.lineWidth = thickness;
  context.beginPath();
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.stroke();

  if (thickness > 2) {
    const left = dir + 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
    const right = dir - 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  }

  if (thickness < 5 && Math.random() < 0.3) {
    context.save();
    context.strokeStyle = "#c72c35";
    const th = Math.random() * 6 + 3;
    context.lineWidth = th;
    context.beginPath();
    context.moveTo(v1.x, v1.y);
    context.lineTo(v1.x, v1.y - 2);
    context.stroke();
    context.restore();
  }
}

const v0 = new Vector2D(256, 0);
drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);
