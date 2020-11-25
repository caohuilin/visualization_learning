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

4. context.fill 将绘制的内容真正输出到画布中

##### 状态信息

1. fillStyle 绘制填充颜色

2. font 字体信息

3. textAlign 对齐方式

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
