// 功能
// 导入音乐，自定义音轨
// 导出音轨会保留音乐信息
// 导入音轨会自动导入音乐

let btn = document.querySelector(".btn");
let music = document.querySelector("#music");
let getAudio = document.querySelector(".getAudio");
let pushOutBtn = document.querySelector(".pushOutBtn");
let outEdit = document.querySelector(".outEdit");
let btn2 = document.querySelector(".btn2");
let pullInBtn = document.querySelector(".pullInBtn");
let typeStyle = document.querySelector("#typeStyle");
let audio = document.querySelector("audio");
let GC = document.querySelector("#gameContainer");
let control = document.querySelector(".control");
let line = document.querySelector(".line");
let grades = document.querySelector(".grades");
let tips = document.querySelector(".tips");

// 音轨的导出和导入
let pushout = (p) => {
  //    转换为json，放在blob中创建url
  let a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(p)]));
  a.download = "追光（默认）";
  a.click();
  document.body.appendChild(a); //先放入dom再删除
  document.body.removeChild(a); // 下载完成移除元素
  window.URL.revokeObjectURL(a.href); // 释放掉url
  a = {};
};
let pullin = async function (p) {
  let file = p[0];
  let reader = new FileReader();
  reader.readAsText(file);
  return await new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(JSON.parse(reader.result));
    };
  });
};
// 音乐导入
let musicIn = (p = []) => {
  let file = p[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    audio.src = reader.result;
  };
};

// 键盘事件
function keyDown(a, b) {
  GC.changeSlideType(a);
  typeStyle.innerHTML = b;
}
// 编辑功能
// 打开编辑菜单，重置音乐和时间轴，不清除滑块
btn.onclick = (e) => {
  // 阻止冒泡,清除默认捕捉，重置重置音乐和时间轴
  e.stopPropagation();
  e.target.blur();
  GC.resetTimeAndMusic();
  grades.style.visibility = "hidden";
  if (e.target.innerHTML == "编辑") {
    // 唤醒编辑菜单
    e.target.innerHTML = "开始";
    getAudio.style.left = 0;
    pushOutBtn.style.left = 0;
    outEdit.style.left = 0;
    tips.style.left = 0;
    typeStyle.style.left = "10px";
  } else {
    let p = 1;
    // 监视键盘和鼠标
    document.onkeydown = (e) => {
      if (e.key == "e") {
        keyDown("e", "&nbsp;||");
      }
      if (e.key == "w") {
        keyDown("w", "==");
      }
      if (e.key == "q") {
        keyDown("q", "-O-");
      }
      if (e.key == "r") {
        keyDown("r", "<--");
      }
      if (e.key == "t") {
        keyDown("t", "-->");
      }
      if (e.key == "s") {
        p = p == 1 ? 0 : 1;
        GC.pause_play(p);
        if (!p) {
          keyDown("s", "-s-");
        }
      }
    };
    control.addEventListener("click", GC.addSlide);
    //读谱
    GC.readTrack();
  }
};

// 开始
// 重置音乐和时间轴，顺序播放谱曲
btn2.onclick = (e) => {
  e.stopPropagation();
  e.target.blur();
  if (btn.innerHTML == "开始") return;
  else {
    GC.playGame();
    GC.keyboardStick();
  }
};

// 导入曲谱

pullInBtn.onclick = (e) => {
  e.stopPropagation();
  GC.resetTimeAndMusic();
  music.style.visibility = "visible";
  music.onchange = () => {
    GC.clearSlides();
    pullin(music.files).then((value) => {
      audio.src = value.audio;
      GC.pullInTrack(value);
    });
  };
};

// 导入音频

getAudio.onclick = (e) => {
  GC.resetTimeAndMusic();
  e.stopPropagation();
  music.style.visibility = "visible";
  music.onchange = () => {
    GC.clearSlides();
    musicIn(music.files);
  };
};
// 导出曲谱
pushOutBtn.onclick = (e) => {
  e.stopPropagation();

  // 暂停音乐和编辑操作
  control.removeEventListener("click", GC.addSlide);
  GC.resetTimeAndMusic();

  let trackFile = {
    slides: GC.getSlides(),
    audio: audio.src,
  };
  pushout(trackFile);
};
// 退出编辑
outEdit.onclick = (e) => {
  e.stopPropagation();
  // 回退按钮，改为编辑，停止addslide回调，停止音乐播放
  control.removeEventListener("click", GC.addSlide); //移除编辑操作
  GC.resetTimeAndMusic();

  document.onkeydown = () => {};
  btn.innerHTML = "编辑";
  getAudio.style.left = "-80px";
  pushOutBtn.style.left = "-80px";
  outEdit.style.left = "-80px";
  typeStyle.style.left = "-80px";
  tips.style.left = "-80px";
};

// 提示
tips.onclick = (e) => {
  e.stopPropagation();
  alert(
    "建议将浏览器画面调整到80%！！！\n编辑功能：\n    'q''w''e''r''t'为编辑功能的滑块类型转换按键\n    's'为暂停和删除按键\n播放功能：\n    空格键判定圆形滑块，鼠标触碰判定双线滑块，'a'和'd'键判定左右方滑块"
  );
};
