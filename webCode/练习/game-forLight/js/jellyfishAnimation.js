
let fishBody = document.querySelector('.fishBody')
let control = document.querySelector('.control')
let jellyfish = document.querySelector('.jellyfish')
let cursorX

control.addEventListener('mousemove', (e) => {
    // 水母跟随鼠标移动
    cursorX = e.offsetX
    cursorX = cursorX < 50 ? 50 : cursorX > 750 ? 750 : cursorX
    fishBody.style.left = cursorX - fishBody.offsetWidth / 2 + 'px'
    
}, true)
// 定期生成水母下面的那个小气泡。用css动画来完成
setInterval(() => {
    let a = document.createElement('div')
    a.innerHTML = 'o'
    a.classList.add('slowDown')
    a.style.left = cursorX - fishBody.offsetWidth / 2 + 'px'

    jellyfish.appendChild(a)
    a.addEventListener('webkitAnimationEnd', () => {
        jellyfish.removeChild(a)
    })
     
},1500);