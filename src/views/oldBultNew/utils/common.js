import '../../common/js/window'
/**
 * @description 获取地址栏问号后面的参数值
 * @param {*} ename
 */
export const getUrlParam = (ename) => {
  let url = window.location.href
  let Request = new Object()
  if (url.indexOf('?') != -1) {
    let str = url.split('?')[1]
    let strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
    }
  } else {
    return ''
  }
  let params = Request[ename] ? Request[ename].split('#')[0] : ''
  return params
}

/**
 * 倒计时每帧计算
 * @param {num} startTime
 * @param {num} endTime
 */
export const countDown = (diff, fps) => {
  let timeH, timeM, timeS, timeMS
  let totalH = diff / 1000 / 60 / 60 // 总时数
  timeH = Math.floor(totalH) // 整时
  timeM = Math.floor((totalH - timeH) * 60) // 整分
  timeS = Math.floor(((totalH - timeH) * 60 - timeM) * 60) // 整秒
  timeMS = Math.floor(((((totalH - timeH) * 60 - timeM) * 60 - timeS) * 1000) / (1000 / fps))
  return {
    timeH,
    timeM,
    timeS,
    timeMS
  }
}
/**
 * 利用requestAnimationFrame接口重新定义setInterval定时器接口
 */
export class M {
  constructor () {
    this.arr = []
  }
  setInterval (fn) {
    // 模拟函数名 --- 循环
    const len = this.arr.length
    this.arr[len] = {
      // 建立动画对象
      for () { },
      animate: 0
    }
    this.arr[len].for = () => {
      fn()
      if (!this.arr[len]) {
        // 如果该对象被删除了，则退出递归
        return
      }
      this.arr[len].animate = requestAnimationFrame(this.arr[len].for) // 递归调用
    }
    this.arr[len].animate = requestAnimationFrame(this.arr[len].for)
    return {
      index: len, // 返回arr数组内动画对象的下标
      obj: this.arr[len], // 返回当前动画对象
      arr: this.arr // 返回所有生成过的对象，便于外部控制与手动释放
    }
  }
  clearInterval (obj) {
    // 清空
    if (!obj || !obj.arr) {
      return
    }
    cancelAnimationFrame(obj.obj.animate) // 默认清除当前传进来的对象
    obj.obj.animate = obj.obj.for = null // 断开依赖关系，释放内存
    delete this.arr[obj.index] // 删除对象
  }
}
/**
 * 利用M类重定义的setInterval方法计算浏览器的fps（刷新频率）
 */
export class Fps extends M {
  constructor (setterCb) {
    super()
    this.setterCb = setterCb
    this.fps = 0
    this.diff = 0
    this.then = Date.now()
    this.computedFps()
  }
  computedFps () {
    this.stop = this.setInterval(() => {
      this.diff = Date.now() - this.then
      this.fps += 1
      if (this.diff >= 1000) {
        this.setterCb && this.setterCb(this.fps)
        this.then += this.diff
        this.fps = 0
      }
    })
  }
}
