import createStar from "./js/backgroundAnimation.js";
import createGameCanvas from "./js/createGameCanvas.js";
import "./js/btnControl.js";
import "./js/jellyfishAnimation.js";
import "./js/effect.js";

// 获取背景对象的配置
var bgCanvas = (() => {
  let canvas = document.querySelector(".background");
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;

  let context = canvas.getContext("2d"),
    cw = canvas.offsetWidth,
    ch = canvas.offsetHeight;

  return {
    context,
    cw,
    ch,
  };
})();
createStar(bgCanvas);

// 获取游戏canvas配置
var gameCanvas = (() => {
  let canvas = document.querySelector("#gameBox");
  canvas.height = canvas.offsetHeight;
  canvas.width = canvas.offsetWidth;
  let context = canvas.getContext("2d"),
    cw = canvas.offsetWidth,
    ch = canvas.offsetHeight;

  return {
    context,
    cw,
    ch,
  };
})();



// 获取gameContainer的方法，并绑定到gameContainer上，以便所有模块都能访问，类似于一个全局事件总线
let gameContainer = document.querySelector("#gameContainer");
let fucs = createGameCanvas(gameCanvas); //返回一些函数
Object.assign(gameContainer, fucs);
