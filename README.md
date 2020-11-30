# 可视化学习笔记

## 构建可视化的方式

1. HTML + CSS 没有其他依赖，实现图表比较复杂，无法直观看出与数据的关系

2. SVG 将 HTML 标签替换成 SVG 标签，运用了一些 SVG 支持的特殊属性。依赖于浏览器 Dom 渲染，渲染流程比较长，和 HTML 一样有性能瓶颈

3. Canvas 指令式绘图。Canvas 元素在浏览器上创造一个空白的画布，通过提供渲染上下文，赋予我们绘制内容的能力。很难单独对 Canvas 绘图的局部进行控制

4. WebGl 基于 OpenGL ES 规范的浏览器实现的，API 相对更底层。是浏览器提供的功能强大的绘图系统，它使用比较复杂，但是功能强大，能够充分利用 GPU 并行计算的能力，来快速、精准地操作图像的像素，在同一时间完成数十万或数百万次计算。另外，它还内置了对 3D 物体的投影、深度检测等处理，这让它更适合绘制 3D 场景。

> Canvas 和 SVG 的使用也不是非此即彼的，它们可以结合使用。因为 SVG 作为一种图形格式，也可以作为 image 元素绘制到 Canvas 中。举个例子，我们可以先使用 SVG 生成某些图形，然后用 Canvas 来渲染。这样，我们就既可以享受 SVG 的便利性，又可以享受 Canvas 的高性能了。

## Canvas

### 宽高

Canvas 元素上的 width 和 height 属性不等同于 Canvas 元素的 CSS 样式的属性。这是因为，CSS 属性中的宽高影响 Canvas 在页面上呈现的大小，而 HTML 属性中的宽高则决定了 Canvas 的坐标系。为了区分它们，我们称 Canvas 的 HTML 属性宽高为画布宽高，CSS 样式宽高为样式宽高。

在实际绘制的时候，如果我们不设置 Canvas 元素的样式，那么 Canvas 元素的画布宽高就会等于它的样式宽高的像素值。

Canvas 将画布宽高和样式宽高分开的做法，能更方便地适配不同的显示设备。

### 坐标系

Canvas 默认左上角为坐标原点，x 轴水平向右，y 轴垂直向下

### 绘制流程

#### 获取 Canvas 上下文

```canvas
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
```

#### 使用上下文绘制图形

##### API 分类

1. 设置状态的 API，可以设置或改变当前的绘图状态，比如，改变要绘制图形的颜色、线宽、坐标变换等等.

2. 绘制指令 API，用来绘制不同形状的几何图形.

##### 绘制流程

1. context.fillStyle 设置绘制填充颜色

2. context.beginPath 开始绘制图形

3. 调用绘制指令

4. context.fill 将绘制的内容真正输出到画布中 || context.stroke 绘制已经存在的路径

##### 状态信息

1. fillStyle 绘制填充颜色

2. font 字体信息

3. textAlign 对齐方式

4. lineCap 线条末端样式

- butt 方形

- round 圆形

- square 以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域

##### 部分 API

1. 绘制矩形 rect

```canvas
context.rect(x, y, width, height);
```

四个参数，前两个参数是起始位置，后两个参数的矩形的宽高

2. 平移画布 translate

```canvas
context.translate(dx, dy)
```

3. 旋转画布 scale

```canvas
context.scale(1, -1) // x 轴不变 y 轴翻转 180 度
```

3. 暂存画布状态 save

可以保存当前画布的 translate 状态，还可以保存其他的信息，比如，fillStyle 等颜色信息

```
context.save(); // 暂存状态
```

4. 恢复 restore

```
context.restore(); // 恢复状态
```

5. 绘制圆形 arc

```canvas
context.arc(x, y, r, 0, TAU);
```

五个参数，前两个参数为圆心位置，r 为圆半径，后两个参数为起始角度和终止角度

6. 填充文本 fillText

```canvas
context.fillText(name, x, y);
```

7. 擦除 clearRect

把像素设置为透明，实现擦除一个矩形区域。

```canvas
context.clearRect(x, y, width, height);
```

8. 创建一个新的路径 beginPath

```canvas
ctx.beginPath();
```

9. 移动画笔 moveTo

```canvas
ctx.moveTo(50,50);
```

10. 直线链接当前点与目标点 lineTo

```canvas
ctx.lineTo(100, 100)
```

> 注意: 不会真正绘制

11. 绘制当前或已经存在的路径 stroke

```canvas
ctx.stroke()
```

## svg

声明式绘图系统, 声明一些标签就可以实现绘图

### 坐标系

以图像左上角为原点，x 轴向右，y 轴向下的左手坐标系，在默认情况下，SVG 坐标与浏览器像素对应。

svg 通过设置 viewBox 来改变坐标系

### 绘制

创建 svg 节点使用 createElementNS

### 部分 API

1. 圆形

```xml
<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="orange" />
```

## 计算机图形系统

一个通用计算机图形系统主要包括 6 个部分，分别是输入设备、中央处理单元、图形处理单元、存储器、帧缓存和输出设备。

<image src="https://github.com/caohuilin/visualization_learning/blob/master/render_process.jpeg" />

#### 相关概念

1. 光栅（Raster）：几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的像素阵列。

2. 像素（Pixel）：一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。

3. 帧缓存（Frame Buffer）：在绘图过程中，像素信息被存放于帧缓存中，帧缓存是一块内存地址。

4. CPU（Central Processing Unit）：中央处理单元，负责逻辑计算。

5. GPU（Graphics Processing Unit）：图形处理单元，负责图形计算。

#### 绘制过程

1. 数据经过 CPU 处理，成为具有特定结构的几何信息

2. GPU 将几何信息生成光栅信息

3. 光栅信息会输出到帧缓存中

4. 渲染到屏幕上

这个过程叫做<strong>渲染管线</strong>

## WebGL

在绘图的时候，WebGL 是以顶点和图元来描述图形几何信息的，顶点就是几何图形的顶点，比如，三角形有三个顶点，四边形有四个顶点。图元是 WebGL 可直接处理的图形单元，由 WebGL 的绘图模式决定，有点、线、三角形等等。

WebGL 绘制一个图形的过程，一般需要用到两段着色器，一段叫顶点着色器（Vertex Shader）负责处理图形的顶点信息，另一段叫片元着色器（Fragment Shader）负责处理图形的像素信息。

> 着色器: 用 GLSL 这种编程语言编写的代码片段

顶点着色器理解为处理顶点的 GPU 程序代码。它可以改变顶点的信息（如顶点的坐标、法线方向、材质等等），从而改变我们绘制出来的图形的形状或者大小等等。

顶点处理完成之后，WebGL 就会根据顶点和绘图模式指定的图元，计算出需要着色的像素点，然后对它们执行片元着色器程序。

WebGL 从顶点着色器和图元提取像素点给片元着色器执行代码的过程叫做光栅化过程。

片元着色器的作用，就是处理光栅化后的像素信息。

> 图元是 WebGL 可以直接处理的图形单元，所以其他非图元的图形最终必须要转换为图元才可以被 WebGL 处理

### 坐标系

WebGL 的坐标系是一个三维空间坐标系，默认以画布正中间为坐标原点，坐标原点是（0,0,0）。其中，x 轴朝右，y 轴朝上，z 轴朝外。这是一个右手坐标系。x 轴、y 轴在画布中范围是 -1 到 1。

WebGL 使用的数据需要用类型数组定义，默认格式是 Float32Array。

### 基本步骤

1. 创建 WebGL 上下文

```
const canvas = document.querySelector("canvas")!;
const gl = canvas.getContext("webgl");
```

2. 创建 WebGL 程序（WebGL Program）

a. 创建着色器

```
const vertex = `
  attribute vec2 position;
  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;
```

b. 将着色器创建成 shader 对象

```
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);
```

c. 创建 WebGLProgram 对象，并将 shader 关联到 WebGL 程序上

```
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.linkProgram(program);
```

d. 启用 WebGLProgram 对象

```
gl.useProgram(program);
```

3. 将数据存入缓冲区

a. 创建一个缓存对象 (createBuffer)

```
const bufferId = gl.createBuffer();
```

b. 将缓冲对象绑定为当前操作对象 (bindBuffer)

```
gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
```

c. 把当前的数据写入缓存对象 (bufferData)

```
gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
```

4. 将缓冲区数据读取到 GPU

将 buffer 的数据绑定给顶点着色器的 position 变量

```
const vPosition = gl.getAttribLocation(program, "position");
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(vPosition);
```

5. GPU 执行 WebGL 程序，输出结果

先调用 gl.clear 将当前画布的内容清除，然后调用 gl.drawArrays 传入绘制模式。

```
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
```

### GLSL

1. attribute: 声明变量
   vec2: 变量类型 代表二维向量

```
attribute vec2 position;
```

2. gl_FragColor: 定义和改变图形的颜色, 表示当前像素点颜色，是一个用 RGBA 色值表示的四维向量数据。

3. gl_Position: 设置顶点

4. varying: 由顶点着色器传输给片段着色器中的插值数据

5. uniform 定义固定值， uniform 变量既可以在顶点着色器中使用，也可以在片元着色器中使用

## 向量相关知识

向量 v 有两个含义：一是可以表示该坐标系下位于 (x, y) 处的一个点；二是可以表示从原点 (0,0) 到坐标 (x,y) 的一根线段

### 长度

```
v.length = Math.hypot(this.x, this.y)
```

### 方向

```
v.dir = Math.atan2(this.y, this.x)
```

### 向量加法

<image src="https://github.com/caohuilin/visualization_learning/blob/master/vector_add.jpeg" />

### 根据长度和方向求向量

```
v.x = v.length * Math.cos(v.dir);
v.y = v.length * Math.sin(v.dir);
```

> 如果希望以点 (x0, y0) 为起点，沿着某个方向画一段长度为 length 的线段，只需要构造出如下的一个向量就可以了。

<image src="https://github.com/caohuilin/visualization_learning/blob/master/vector_1.jpeg" />

> 这里的 α 是与 x 轴的夹角，v 是一个单位向量，它的长度为 1。然后我们把向量 (x0, y0) 与这个向量 v1 相加，得到的就是这条线段的终点

### 向量的点乘

在 N 维线性空间中，a、b 向量点积的几何含义，是 a 向量乘以 b 向量在 a 向量上的投影分量。它的物理含义相当于 a 力作用于物体，产生 b 位移所做的功

```
a•b = |a||b|cos(α)
```

> 当 a、b 两个向量平行时，它们的夹角就是 0°，那么 a·b=|a||b|

> 当 a、b 两个向量垂直时，它们的夹角就是 90°，那么 a·b=0

### 向量的叉乘

以二维空间为例，向量 a 和 b 的叉积，就相当于向量 a 与向量 b 沿垂直方向的投影的乘积

二维向量叉乘的几何意义是向量 a、b 组成的平行四边形的面积

二维=向量叉乘的物理意义就是 a 和 b 的力矩

```
a x b = |a||b|sin(α)
```

### 归一化。

用 v0 的 x、y 分别除以它的绝对值

归一化后的向量方向不变，长度为 1

在向量乘法里，如果 a、b 都是长度为 1 的归一化向量，那么|a X b| 的结果就是 a、b 夹角的正弦值，而|a • b|的结果就是 a、b 夹角的余弦值

## 曲线

### 通用曲线

通用曲线通过参数方程进行描述

### 贝塞尔曲线

贝塞尔曲线又分为二阶贝塞尔曲线和三阶贝塞尔曲线。二阶贝塞尔曲线的参数方程是一元二次多项式，三阶贝塞尔曲线的参数方程是一元三次多项式。

<image src="https://github.com/caohuilin/visualization_learning/blob/master/qbc_2.jpeg" />

其他贝塞尔曲线方程详见: http://math001.com/bezier_curve/

## 填充多边形

### canvas 和 svg 填充多边形

使用 context.fill 完成

支持两种规则

- nonzero 由边围起来的区域都一律填充

- evenodd 根据重叠区域是奇数还是偶数来判断是否填充

### WebGL 填充多边形

1. 三角剖分： 将多边形分割成若干个三角形的操作

相关库

- https://github.com/mapbox/earcut

- https://github.com/memononen/tess2.js

- https://github.com/mikolalysenko/cdt2d

2. 调用 gl.drawElements

支持渲染模式

- gl.POINTS: 画单独的点。

- gl.LINE_STRIP: 画一条直线到下一个顶点。

- gl.LINE_LOOP: 绘制一条直线到下一个顶点，并将最后一个顶点返回到第一个顶点.

- gl.LINES: 在一对顶点之间画一条线.

- gl.TRIANGLE_STRIP [https://en.wikipedia.org/wiki/Triangle_strip]

- gl.TRIANGLE_FAN [https://en.wikipedia.org/wiki/Triangle_fan]

- gl.TRIANGLES: 为一组三个顶点绘制一个三角形.

## 判断点在多边形内部

1. 使用 Canvas 的 isPointInPath 方法

```
const {left, top} = canvas.getBoundingClientRect();

canvas.addEventListener('mousemove', (evt) => {
  const {x, y} = evt;
  // 坐标转换
  const offsetX = x - left;
  const offsetY = y - top;

  ctx.clearRect(-256, -256, 512, 512);

  if(ctx.isPointInPath(offsetX, offsetY)) {
    // 在内部操作
  } else {
    // 不在内部操作
  }
});
```

> isPointInPath 方法只能对当前绘制的图形生效

2. 实现通用的 isPointInPath 方法

将多边形进行三角抛分，判断点是否在三角形中

原理：

1. 已知一个三角形的三条边分别是向量 a、b、c，平面上一点 u 连接三角形三个顶点的向量分别为 u1、u2、u3，那么 u 点在三角形内部的充分必要条件是：u1 X a、u2 X b、u3 X c 的符号相同

2. 如果一个点 u1 在三角形的一条边 a 上，那就会需要满足以下 2 个条件：

- a.cross(u1) === 0

- 0 <= a.dot(u1) / a.length \*\* 2 <= 1

```
function inTriangle(p1, p2, p3, point) {
  const a = p2.copy().sub(p1);
  const b = p3.copy().sub(p2);
  const c = p1.copy().sub(p3);

  const u1 = point.copy().sub(p1);
  const u2 = point.copy().sub(p2);
  const u3 = point.copy().sub(p3);

  const s1 = Math.sign(a.cross(u1));
  let p = a.dot(u1) / a.length ** 2;
  if(s1 === 0 && p >= 0 && p <= 1) return true;

  const s2 = Math.sign(b.cross(u2));
  p = b.dot(u1) / b.length ** 2;
  if(s2 === 0 && p >= 0 && p <= 1) return true;

  const s3 = Math.sign(c.cross(u3));
  p = c.dot(u1) / c.length ** 2;
  if(s3 === 0 && p >= 0 && p <= 1) return true;

  return s1 === s2 && s2 === s3;
}
```

```
function isPointInPath({ vertices, cells }, point) {
  let ret = false;
  for (let i = 0; i < cells.length; i += 3) {
    const p1 = new Vector2D(...vertices[cells[i]]);
    const p2 = new Vector2D(...vertices[cells[i + 1]]);
    const p3 = new Vector2D(...vertices[cells[i + 2]]);
    if (inTriangle(p1, p2, p3, point)) {
      ret = true;
      break;
    }
  }
  return ret;
}
```

## 仿射变换

仿射变换具有以下 2 个性质：

- 仿射变换前是直线段的，仿射变换后依然是直线段

- 对两条直线段 a 和 b 应用同样的仿射变换，变换前后线段长度比例保持不变

常见的仿射变换形式包括平移、旋转、缩放以及它们的组合，旋转与缩放属于线性变换

线性变换性质：

- 线性变换不改变坐标原点（因为如果 x0、y0 等于零，那么 x、y 肯定等于 0）；

- 线性变换可以叠加，多个线性变换的叠加结果就是将线性变换的矩阵依次相乘，再与原始向量相乘。

## 颜色表示

### RGB 和 RGBA

RGB 用三原色的色阶来表示颜色，是最基础的颜色表示法，但是它对用户不够友好

> WebGL 的 shader 默认支持 RGBA。在 WebGL 的 shader 中是使用一个四维向量来表示颜色的，向量的 r、g、b、a 分量分别表示红色、绿色、蓝色和 alpha 通道。和 CSS 的颜色不同，WebGL 采用归一化的浮点数值，WebGL 的颜色分量 r、g、b、a 的数值都是 0 到 1 之间的浮点数。

### HSL 和 HSV

用色相（Hue）、饱和度（Saturation）和亮度（Lightness）或明度（Value）来表示颜色，Hue 是角度，取值范围是 0 到 360 度，饱和度和亮度 / 明度的值都是从 0 到 100%。它对开发者比较友好，但是它的数值变换与人眼感知并不完全相符

### CIE Lab 和 CIE Lch

CIE Lab 颜色空间简称 Lab，它其实就是一种符合人类感觉的色彩空间， 用 L 表示亮度，a 和 b 表示颜色对立度。

### Cubehelix 色盘（立方螺旋色盘）

Cubehelix 的原理就是在 RGB 的立方中构建一段螺旋线，让色相随着亮度增加螺旋变换。适合呈现颜色随数据动态改变的效果。
