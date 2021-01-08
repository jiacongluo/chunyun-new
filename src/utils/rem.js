(function (doc, win) { // 立即执行,所以只引入多次会执行多次
    // console.log('NODE_ENV:',process.env.NODE_ENV)
  Window['NODE_ENV'] = process.env.NODE_ENV

    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth
			// debugger
            console.log('屏幕宽度:',clientWidth)
            if (!clientWidth) return
            if (true) {
                docEl.style.fontSize = 192 * (clientWidth / 1920) + 'px'
            } else {
                if (clientWidth<=1920) {
                    docEl.style.fontSize = 192 + 'px'
                } else {
                    // 理想字体大小(取设计图宽度的1/10就好) * (屏幕宽 / 设计图宽)
                    docEl.style.fontSize = 192 * (clientWidth / 1920) + 'px'
                }
            }
            window['onRender']&&window['onRender']();
        }
    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
