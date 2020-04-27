/* eslint-disable */

const SH = window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

const SW = window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function throttle(fn, delay) {
  let start = 0;
  let timer = null;
  return function () {
    const args = arguments;
    const self = this;
    if (Date.now() - start >= delay) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(self, args);
      start = Date.now();
    } else if (!timer) {
      timer = setTimeout(function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn.apply(self, args);
        start = Date.now();
      }, delay);
    }
  }
}

function LazyImage(container) {
  this.container = container;
  this.map = new Map();
  this.timer = null;
  this.offsetTop = -200;
  this.offsetBottom = 1.3 * SH;
  this.offsetLeft = -100;
  this.offsetRight = 1.5 * SW;
}

LazyImage.prototype.add = function(node, src) {
  this.map.set(node, src);
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  // 初始化；当 img 添加完成后开始计算 img 的位置
  // 决定是否展示
  this.timer = setTimeout(() => this.each(), 60);
}

LazyImage.prototype.remove = function(node) {
  this.map.delete(node);
}

LazyImage.prototype.each = function() {
  if (this.timer) {
    clearTimeout(this.timer);
    this.timer = null;
  }
  const map = [...this.map.entries()];
  const len = map.length;
  for (let i = 0; i < len; i++) {
    const node = map[i][0];
    const src = map[i][1];
    const { top, left } = node.getBoundingClientRect();
    if (
      (top < this.offsetBottom && top > this.offsetTop) &&
      (left < this.offsetRight && left > this.offsetLeft)
    ) {
      node.src = src;
      this.map.delete(node);
    }
  }
}

LazyImage.prototype.run = function() {
  this.container.onscroll = throttle(() => {
    this.each();
  }, 400);
}

LazyImage.prototype.destory = function() {
  this.map.clear();
  this.container.onscroll = null;
  stack.delete(this.container);
}

const stack = new WeakMap();

export default function(container) {
  const value = stack.get(container);
  if (value) return value;

  const lazy = new LazyImage(container);
  lazy.run();
  stack.set(container, lazy);
  return lazy;
}
