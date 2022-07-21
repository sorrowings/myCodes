import { w_slide, e_slide, q_slide, r_slide, t_slide } from "./slides.js";
import collisionTest from "./collision.js";
import {
  effectImg1,
  effectImg2,
  effectImg3,
  effectImg4,
  effectImg5,
} from "./effect.js";

let fishBody = document.querySelector(".fishBody");
// let jellyfish = document.querySelector(".jellyfish");
let startLine = document.querySelector(".startLine");
let audio = document.querySelector("audio");
let line = document.querySelector(".line");
let lineEff = document.querySelector(".lineEff");
let grades = document.querySelector(".grades");

let createGameCanvas = function (config) {
  let { context, cw, ch } = config;

  // 游戏初始状态
  let theTrack = {
    slides: [], //滑块数组
    effects: [], //特效数组
    music: "", //音乐地址
    time: 0, //时间轴
    slideType: "w",
    timer: {}, //定时器
    keybord: "", //键盘监听记录键盘事件
  };
  // 初始花
  function resetTimeAndMusic() {
    theTrack.time = 0;
    clearInterval(theTrack.timer);
    audio.load();
    grades.innerHTML = 0;
  }
  // 初始化sildes
  function clearSlides() {
    theTrack.slides = [];
  }
  //  更改type
  function changeSlideType(type) {
    theTrack.slideType = type;
  }
  // 增加滑块
  function addSlide(e) {
    let x = e.offsetX,
      y = 800;

    if (theTrack.slideType == "s") {
      deleteSlide(e.offsetX, e.offsetY);
      return;
    }
    // 判断添加什么类型
    let p;
    if (theTrack.slideType == "w") {
      p = w_slide(x, y);
    }
    if (theTrack.slideType == "e") {
      p = e_slide(x, y);
    }
    if (theTrack.slideType == "q") {
      p = q_slide(x, y);
    }
    if (theTrack.slideType == "r") {
      p = r_slide(x, y);
    }
    if (theTrack.slideType == "t") {
      p = t_slide(x, y);
    }
    let t = Math.floor(800 / p.speed); //滑块落到判定线的时间。在初始这段时间内，不会生成滑块
    if (t < theTrack.time) {
      theTrack.slides.push(p);

      p.drawSlide();
      // 计算落下的时间点
      p.timeToFall = theTrack.time - t;
    }
  }
  // 删除
  function deleteSlide(x, y) {
    for (let i = 0; i < theTrack.slides.length; i++) {
      let p = theTrack.slides[i];

      if (Math.abs(p.x - x) < p.w / 2 && Math.abs(p.y - y) < p.l / 2) {
        theTrack.slides.splice(i, 1);
        context.clearRect(0, 0, cw, ch);
        for (let i = 0; i < theTrack.slides.length; i++) {
          if (
            theTrack.slides[i].y < ch &&
            theTrack.slides[i].timeToFall < theTrack.time
          ) {
            theTrack.slides[i].drawSlide();
          }
        }
      }
    }
  }

  // 暂停与继续
  function pause_play(a) {
    if (a == 0) {
      audio.pause();
      clearInterval(theTrack.timer);
    } else {
      audio.pause();
      theTrack.timer = setInterval(() => {
        // 初始线向下
        if (startLine.offsetTop < ch) {
          startLine.style.top = startLine.offsetTop + 2 + "px";
        }
        theTrack.time += 1;
        context.clearRect(0, 0, cw, ch);
        for (let i = 0; i < theTrack.slides.length; i++) {
          if (
            theTrack.slides[i].y < ch &&
            theTrack.slides[i].timeToFall < theTrack.time
          ) {
            theTrack.slides[i].fallDown();
          }
        }
      }, 10);
    }
  }
  // 读谱-编辑
  function readTrack() {
    resetTimeAndMusic();
    // 滑块复位
    for (let i = 0; i < theTrack.slides.length; i++) {
      theTrack.slides[i].reset();
    }

    audio.play();
    // 初始线
    startLine.style.top = -1 + "px";
    theTrack.timer = setInterval(() => {
      // 初始线向下
      if (startLine.offsetTop < ch) {
        startLine.style.top = startLine.offsetTop + 2 + "px";
      }
      theTrack.time += 1;
      context.clearRect(0, 0, cw, ch);
      for (let i = 0; i < theTrack.slides.length; i++) {
        if (
          theTrack.slides[i].y < ch &&
          theTrack.slides[i].timeToFall < theTrack.time
        ) {
          theTrack.slides[i].fallDown();
        }
      }
    }, 10);
  }
  // 读谱-开始
  function playGame() {
    resetTimeAndMusic();
    // 滑块复位
    for (let i = 0; i < theTrack.slides.length; i++) {
      theTrack.slides[i].reset();
    }
    // 起始线复位
    startLine.style.top = -1 + "px";
    // 播放音频
    audio.play();
    // 显示分数
    grades.style.visibility='visible'
    // 开始定时器，扫描滑块数据
    theTrack.timer = setInterval(() => {
      // 水母中心
      let fishBodyX = fishBody.offsetLeft + fishBody.offsetWidth / 2;
      let fishBodyY = fishBody.offsetTop + fishBody.offsetHeight / 2;

      // 读取数据，并下落
      if (startLine.offsetTop < ch) {
        startLine.style.top = startLine.offsetTop + 2 + "px";
      }
      theTrack.time += 1;
      context.clearRect(0, 0, cw, ch);
      // 碰撞检测
      for (let i = 0; i < theTrack.slides.length; i++) {
        let p = theTrack.slides[i];
        if (p.timeToFall < theTrack.time && p.y < ch) {
          p.fallDown(); // 数组里的坐标都是左上角坐标
          //碰撞检测
          if (p.type == "w" || p.type == "e") {
            collisionTest(fishBodyX, fishBodyY, p);
          } else {
            if (p.y > 800 - p.l / 2 && p.y < 800 + p.l / 2) {
              if (p.type == "q" && theTrack.keybord == "sp" && p.isBreak) {
                p.pang();
              }
              if (p.type == "r" && theTrack.keybord == "le" && p.isBreak) {
                p.pang();
              }
              if (p.type == "t" && theTrack.keybord == "ri" && p.isBreak) {
                p.pang();
              }
            }
          }
        }
      }

      // 读取特效数组
      for (let i = 0; i < theTrack.effects.length; i++) {
        if (ballMove(theTrack.effects[i]) == 0) {
          theTrack.effects.splice(i, 0);
        }
      }
    }, 10);
  }
  // 读谱-导入
  function pullInTrack(value) {
    for (let i = 0; i < value.slides.length; i++) {
      let a;
      if (value.slides[i].type == "w") {
        a = w_slide(0, 0);
      }
      if (value.slides[i].type == "e") {
        a = e_slide(0, 0);
      }
      if (value.slides[i].type == "q") {
        a = q_slide(0, 0);
      }
      if (value.slides[i].type == "r") {
        a = r_slide(0, 0);
      }
      if (value.slides[i].type == "t") {
        a = t_slide(0, 0);
      }
      Object.assign(a, value.slides[i]);
      theTrack.slides.push(a);
    }
  }
  // 导出alides
  function getSlides() {
    return theTrack.slides;
  }

  // 键盘敲击判定
  function keyboardStick() {
    document.onkeydown = (e) => {
      if (e.key == " ") {
        // 判定线效果
        theTrack.keybord = "sp";
        setTimeout(() => {
          theTrack.keybord = "";
        }, 100);

        line.classList.add("lineEffect");
        line.addEventListener("webkitAnimationEnd", () => {
          line.classList.remove("lineEffect");
        });
      }
      if (e.key == "a") {
        // 判定线效果
        theTrack.keybord = "le";
        setTimeout(() => {
          theTrack.keybord = "";
        }, 100);

        lineEff.classList.add("lineEffectL");
        lineEff.addEventListener("webkitAnimationEnd", () => {
          lineEff.classList.remove("lineEffectL");
        });
      }
      if (e.key == "d") {
        // 判定线效果
        theTrack.keybord = "ri";
        setTimeout(() => {
          theTrack.keybord = "";
        }, 100);

        lineEff.classList.add("lineEffectR");
        lineEff.addEventListener("webkitAnimationEnd", () => {
          lineEff.classList.remove("lineEffectR");
        });
      }
    };
  }

  // 添加碰撞1效果
  // 开启粒子运动的函数
  function ballMove(points = []) {
    if (points.length == 0) {
      return 0;
    } else {
      for (let index = 0; index < points.length; index++) {
        if (points[index].length == 0) {
          points.splice(index, 1);
        } else {
          for (let j = 0; j < points[index].length; j++) {
            if (points[index][j].destory == true) {
              points[index].splice(j, 1);
            } else {
              points[index][j].move();
            }
          }
        }
      }
      return 1;
    }
  }
  // 在碰撞检测完成后生成一组特效粒子，并将其添加到正在执行的粒子数组中
  function effect(x, y, eff) {
    if (eff == "eff1") {
      let points = effectImg1(x, y);
      theTrack.effects.push(points);
    }
    if (eff == "eff2") {
      let points = effectImg2(x, y);
      theTrack.effects.push(points);
    }
    if (eff == "eff3") {
      let points = effectImg3(x, y);
      theTrack.effects.push(points);
    }
    if (eff == "eff4") {
      let points = effectImg4(x, y);
      theTrack.effects.push(points);
    }
    if (eff == "eff5") {
      let points = effectImg5(x, y);
      theTrack.effects.push(points);
    }
  }

  // 返回方法
  return {
    addSlide,
    deleteSlide,
    readTrack,
    playGame,
    changeSlideType,
    resetTimeAndMusic,
    clearSlides,
    pullInTrack,
    getSlides,
    effect,
    pause_play,
    keyboardStick,
  };
};
export default createGameCanvas;
