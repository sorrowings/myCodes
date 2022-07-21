let createStar = function (config) {
    let {
        context,
        ch,
        cw
    } = config


    // 封装函数
    function drawCircle(x, y, r, color) {
        // 坐标，半径，颜色
        this.beginPath();
        this.fillStyle = color;
        this.arc(x, y, r, Math.PI / 180 * 0, Math.PI / 180 * 360);
        this.fill();
    }

    function intR(i) {
        return Math.floor(Math.random() * i)
    }

    // 类
    class star {
        constructor(x, y) {
            Object.assign(this, {
                x,
                y,
                color: 'white',
                r: 2
            })
        }
        drawStar() {
            drawCircle.call(context, this.x, this.y, this.r, this.color)
        }
    }

    // 画静态背景，并推入数组，方便定位
    var stars = []
    for (let i = 0; i < 30; i++) {
        let a = new star(intR(cw), intR(ch))
        stars.push(a)
        a.drawStar()
    }

    // 实现动态
    setInterval(() => {
        context.clearRect(0, 0, cw, ch)
        for (let i = 0; i < stars.length; i++) {
            let s = stars[i]
            s.y += 0.5;
            if (s.y > ch) {
                stars[i] = new star(intR(cw), 1);
                stars[i].ddrawStar
            }else{
                 s.drawStar()
            }           
        }
    }, 10)
}
export default createStar