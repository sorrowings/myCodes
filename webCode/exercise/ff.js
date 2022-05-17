window.onload = function () {

    //    背景粒子
    let items = document.getElementsByTagName('li')
    let bg = document.getElementById('bg')
    for (let i = 0; i < items.length; i++) {
        let r = parseInt(Math.random() * 30)
        let u = parseInt(Math.random() * 10 + 6)

        let e = Math.random()

        items[i].style.left = r * bg.offsetWidth / 30 + 'px'


        items[i].style.animationDelay = e * 20 + 's'
        items[i].style.animationDuration = u * 2 + 's'

    }

    // 获取画布
    var canvas = document.querySelector("#content");
    var context = canvas.getContext("2d");

    // 动画展示范围
    var w = 500,
        h = 500;


    // 封装函数工具
    // 画点
    function drawCircle(x, y, r, color) {
        // 
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, r, Math.PI / 180 * 0, Math.PI / 180 * 360);
        context.fill();
    }

    // 画粒子的图像和方法
    class ball {

        constructor(dx, dy) {
            // 从随机位置向dx，dy移动，速度由time决定 


            this.x = range(w);
            this.y = range(h)


            // 目标点坐标
            this.dx = dx;
            this.dy = dy;

            // 总距离
            this.initialX = this.dx - this.x
            this.initialY = this.dy - this.y

            // 时间
            this.time = 100

            // 粒子半径和颜色
            this.r = 1.5;
            this.color = colorR();

        }

        // 方法：画出粒子移动轨迹
        draw(count) {
            // 后面是速度方程 时间单位为1
            // this.x += this.initialX /100;
            // this.y += this.initialY /100;
            this.x += this.initialX * 2 / this.time * (1 - count / this.time);
            this.y += this.initialY * 2 / this.time * (1 - count / this.time);
            drawCircle(this.x, this.y, this.r, this.color);
        }
    }

    // 生成随机数
    function range(i) {
        return Math.random() * i;
    }

    function intR(i) {
        return Math.floor(Math.random() * i)
    }
    // 随机颜色
    function colorR() {
        let key = range(1)
        if (key > 0.3) {
            return '#fff'
        } else return '#838383'
    }
    // 筛选粒子位置

    function getImgData(img) {
        context.clearRect(0, 0, w, h);
        context.drawImage(img, 0, 0, 500, 500);

        var copy = context.getImageData(0, 0, 500, 500); // 获取像素点数据            

        img.ballArr = [];

        // 筛选有效像素点

        context.clearRect(0, 0, w, h);

        for (var y = 0; y < h; y += 8) {
            for (var x = 0; x < w; x += 8) {
                // 像素点的序号
                var index = x + y * w;
                // 帅选条件为透明度
                var a = copy.data[index * 4 + 3];
                if (a > 100) {
                    // 符合条件条件的坐标绘制粒子

                    let bal = new ball(x, y);

                    img.ballArr.push(bal);
                    // bal.draw();
                };
            }
        }
    }

    // 设置动画
    function animateBall(img) {
        var count = 1;
        clearInterval(t1)
        t1 = setInterval(function () {
            // console.log(ballArr);
            context.clearRect(0, 0, w, h);
            for (var i = 0; i < img.ballArr.length; i++) {
                img.ballArr[i].draw(count);
            }
            if (count == 100) {
                clearInterval(t1);

            }
            count++;
        }, 30)
    }
    // 开始动画
    function start(a, b, t) {
        setTimeout(() => {
            relateTow(a, b)
            animateBall(a)

        }, 4000 * t)
    }
    //连接两个数组
    function relateTow(a, b) {
        for (let i = 0; i < a.ballArr.length; i++) {
            let v = intR(b.ballArr.length)
            a.ballArr[i].x = b.ballArr[v].dx
            a.ballArr[i].initialX = a.ballArr[i].dx - a.ballArr[i].x
            a.ballArr[i].y = b.ballArr[v].dy
            a.ballArr[i].initialY = a.ballArr[i].dy - a.ballArr[i].y
        }
    }


    // ——————————————————————
    // 绘图，这里要用img.onload,且所有的步骤都要写在里面，否则读取不到画布像素，值都为0
    var img1 = new Image();
    var img2 = new Image();
    var img3 = new Image();
    var img4 = new Image();
    var img5 = new Image();
    var img6 = new Image();
    var img7 = new Image();

    img1.src = './assets/e740e7973ba8559164ed75529ff6f946efd001fc.png@942w_942h_progressive.webp'
    img2.src = './assets/916637ae86ff9365700b7f6cf13148e1a4282388.png@942w_942h_progressive.webp'
    img3.src = './assets/22d926f0f1e11fb36a69d8393b3e6955448d0231.png@942w_942h_progressive.webp'
    img4.src = './assets/3fe9d2cc6a26e765b04450eafedcccc50e7f3a95.png@942w_942h_progressive.webp'
    img5.src = './assets/4a2271098cab8382a1d6bc39ceaa9cf6596fa42e.png@942w_942h_progressive.webp'
    img6.src = './assets/a555d53276872ec8e04aae88cecda7ca50b2608d.png@942w_942h_progressive.webp'
    img7.src = './assets/b5f7d2d2e1d84e998ce71be55e886d74fc7566b0.png@942w_942h_progressive.webp'

    var t1 //定时器


    // 获取所有的图形，粒子位置信息
    img1.onload = function () {
        getImgData(img1)
    }
    img2.onload = function () {
        getImgData(img2)
    }
    img3.onload = function () {
        getImgData(img3)
    }
    img4.onload = function () {
        getImgData(img4)
    }
    img5.onload = function () {
        getImgData(img5)
    }
    img6.onload = function () {
        getImgData(img6)
    }
    img7.onload = function () {
        getImgData(img7)
    }

    // 等待图片绘制后开始
    setTimeout(() => {
        const target = () => {
            start(img1, img7, 0)
            start(img2, img1, 1)
            start(img3, img2, 2)
            start(img4, img3, 3)
            start(img5, img4, 4)
            start(img6, img5, 5)
            start(img7, img6, 6)
            return target
        }
        setInterval(target(), 28000)
    }, 100)
}