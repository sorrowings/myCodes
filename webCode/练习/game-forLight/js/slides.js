let GC = document.querySelector("#gameContainer");
let canvas = document.querySelector("#gameBox");
let context = canvas.getContext("2d");
let grades = document.querySelector(".grades");
// 滑块的类
let grade = 0;
class wSlider {
  constructor(x, y) {
    Object.assign(this, {
      w: 100,
      l: 10,
      // 滑块中心位置
      x: x,
      y: y,
      color: "#FFFF00 ",
      speed: 2, //下落速度
      timeToFall: 0, //下落时机
      isBreak: true,
      type: "w",
    });
  }
  drawSlide() {
    context.strokeStyle = this.color;
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(this.x - this.w / 2, this.y - this.l / 2);
    context.lineTo(this.x + this.w / 2, this.y - this.l / 2);
    context.stroke();

    context.beginPath();
    context.moveTo(this.x - this.w / 2, this.y + this.l / 2);
    context.lineTo(this.x + this.w / 2, this.y + this.l / 2);
    context.stroke();

    context.closePath();
  }
  fallDown() {
    this.y += this.speed;
    this.drawSlide();
  }
  pang() {
    this.isBreak = false;
    this.color = "rgba(255,255,255,0)";
    GC.effect(this.x, this.y, "eff1");
    grades.innerHTML = ++grade;
  }
  reset() {
    this.y = 0;
    this.color = "#FFFF00";
    this.isBreak = true;
  }
}
class eSlider {
  constructor(x, y) {
    Object.assign(this, {
      w: 10,
      l: 100,
      // 滑块中心位置
      x: x,
      y: y,
      color: "#FFFF00 ",
      speed: 2, //下落速度
      timeToFall: 0, //下落时机
      isBreak: true,
      type: "e",
    });
  }
  drawSlide() {
    context.strokeStyle = this.color;
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(this.x - this.w / 2, this.y - this.l / 2);
    context.lineTo(this.x - this.w / 2, this.y + this.l / 2);
    context.stroke();

    context.beginPath();
    context.moveTo(this.x + this.w / 2, this.y - this.l / 2);
    context.lineTo(this.x + this.w / 2, this.y + this.l / 2);
    context.stroke();

    context.closePath();
  }
  fallDown() {
    this.y += this.speed;
    this.drawSlide();
  }
  pang() {
    this.isBreak = false;
    this.color = "rgba(255,255,255,0)";
    GC.effect(this.x, this.y, "eff2");
    grades.innerHTML = ++grade;
  }
  reset() {
    this.y = 0;
    this.color = "#FFFF00";
    this.isBreak = true;
  }
}
class qSlider {
  constructor(x, y) {
    Object.assign(this, {
      w: 40,
      l: 40,
      // 滑块中心位置
      x: x,
      y: y,
      color: "#FFFF00 ",
      speed: 2, //下落速度
      timeToFall: 0, //下落时机
      isBreak: true,
      type: "q",
    });
  }
  drawSlide() {
    context.strokeStyle = this.color;
    context.lineWidth = 2;

    context.beginPath();
    context.arc(this.x, this.y, this.w, 0, (Math.PI / 180) * 360);
    context.stroke();
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.w - 10,
      (Math.PI / 180) * 15,
      (Math.PI / 180) * 75
    );
    context.stroke();
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.w - 10,
      (Math.PI / 180) * 105,
      (Math.PI / 180) * 165
    );
    context.stroke();
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.w - 10,
      (Math.PI / 180) * 195,
      (Math.PI / 180) * 255
    );
    context.stroke();
    context.beginPath();
    context.arc(
      this.x,
      this.y,
      this.w - 10,
      (Math.PI / 180) * 285,
      (Math.PI / 180) * 345
    );
    context.stroke();

    context.closePath();
  }
  fallDown() {
    this.y += this.speed;
    this.drawSlide();
  }
  pang() {
    this.isBreak = false;
    this.color = "rgba(255,255,255,0)";
    // 要改
    GC.effect(this.x, this.y, "eff3");
    grades.innerHTML = ++grade;
  }
  reset() {
    this.y = 0;
    this.color = "#FFFF00";
    this.isBreak = true;
  }
}
class rSlider {
  constructor(x, y) {
    Object.assign(this, {
      w: 80,
      l: 80,
      // 滑块中心位置
      x: x,
      y: y,
      color: "#FFFF00 ",
      speed: 2, //下落速度
      timeToFall: 0, //下落时机
      isBreak: true,
      type: "r",
    });
  }
  drawSlide() {
    context.strokeStyle = this.color;
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(this.x, this.y - this.l / 2);
    context.lineTo(this.x - this.w / 2, this.y);
    context.lineTo(this.x, this.y + this.l / 2);
    context.lineTo(this.x + this.w / 2, this.y);
    context.lineTo(this.x, this.y - this.l / 2);
    context.stroke();

    context.beginPath();
    context.moveTo(this.x, this.y - this.l / 2 + 10);
    context.lineTo(this.x - this.w / 2 + 10, this.y);
    context.lineTo(this.x, this.y + this.l / 2 - 10);
    context.stroke();

    context.closePath();
  }
  fallDown() {
    this.y += this.speed;
    this.drawSlide();
  }
  pang() {
    this.isBreak = false;
    this.color = "rgba(255,255,255,0)";
    // 要改
    GC.effect(this.x, this.y, "eff4");
    grades.innerHTML = ++grade;
  }
  reset() {
    this.y = 0;
    this.color = "#FFFF00";
    this.isBreak = true;
  }
}
class tSlider {
  constructor(x, y) {
    Object.assign(this, {
      w: 80,
      l: 80,
      // 滑块中心位置
      x: x,
      y: y,
      color: "#FFFF00 ",
      speed: 2, //下落速度
      timeToFall: 0, //下落时机
      isBreak: true,
      type: "t",
    });
  }
  drawSlide() {
    context.strokeStyle = this.color;
    context.lineWidth = 2;

    context.beginPath();
    context.moveTo(this.x, this.y - this.l / 2);
    context.lineTo(this.x - this.w / 2, this.y);
    context.lineTo(this.x, this.y + this.l / 2);
    context.lineTo(this.x + this.w / 2, this.y);
    context.lineTo(this.x, this.y - this.l / 2);
    context.stroke();

    context.beginPath();
    context.moveTo(this.x, this.y + this.l / 2 - 10);
    context.lineTo(this.x + this.w / 2 - 10, this.y);
    context.lineTo(this.x, this.y - this.l / 2 + 10);
    context.stroke();

    context.closePath();
  }
  fallDown() {
    this.y += this.speed;
    this.drawSlide();
  }
  pang() {
    this.isBreak = false;
    this.color = "rgba(255,255,255,0)";
    // 要改
    GC.effect(this.x, this.y, "eff5");
    grades.innerHTML = ++grade;
  }
  reset() {
    this.y = 0;
    this.color = "#FFFF00";
    this.isBreak = true;
  }
}

// 这段代码完全没必要，算是遗留的垃圾，可以优化钓
let w_slide = (x, y) => {
  return new wSlider(x, y);
};
let e_slide = (x, y) => {
  return new eSlider(x, y);
};
let q_slide = (x, y) => {
  return new qSlider(x, y);
};
let r_slide = (x, y) => {
  return new rSlider(x, y);
};
let t_slide = (x, y) => {
  return new tSlider(x, y);
};

export { w_slide, e_slide, q_slide, r_slide, t_slide };
