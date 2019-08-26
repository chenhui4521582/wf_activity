// var PrizeSon = ["一等奖 : iPhone6 plus ", " 二等奖 : iPad Air2", " 三等奖 : iPad mini retina", " 四等奖 : 特级红富士一个", " 鼓励奖 : 差点就中奖了!", "  再接再厉 : 很遗憾您没有中奖 !"]; //奖品提示
var isStatr = false // 锁 专拍没有执行完的时候 不可以再次点击 ;
var lenCloc = 0 // 当前第几次计算叠加的度数
export default {
  operation (wheel, PrizeSon, ran, fn,turn=9) {
    lenCloc++
    // var Prize = turntable[ran] - 1,
    var sun = turn * 360 // 编号  // 度数  //  时间
    if (ran >= PrizeSon.length) {
      ran = 0
    }
    var soBuom = 0;
    /*    旋转度数 = 上次度数+ 最小圈数 * 360 + 当前数字 * 60 +随机角度  = 最终旋转度数     */
    wheel.style.transform = ' translateX(-50%) rotate(-' + ((lenCloc * sun + ran * 360 / PrizeSon.length) + soBuom) + 'deg)'
    console.log((lenCloc * sun + ran * 360 / PrizeSon.length) + soBuom)
    setTimeout(function () {
      isStatr = false
      if (fn) {
        fn()
      }
    }, 3200)
  }
}
