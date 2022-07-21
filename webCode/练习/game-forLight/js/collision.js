// 碰撞检测
let fishBody = document.querySelector('.fishBody')
let collisionTest = function (x, y, p) {
    
    // 设置检范围
    if (p.y > (y - p.l / 2 - fishBody.offsetHeight / 2) && p.y < (y + p.l / 2 + fishBody.offsetHeight / 2)) {
        if (p.isBreak) {
           
            if (Math.abs(x - p.x) < (p.w / 2 + fishBody.offsetWidth)) {
                p.pang()
            }
        }
    }
}
export default collisionTest