import axios from 'axios'
import moment from 'moment'
import util from './utils.js'
moment.locale('zh-cn', {
  months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
  monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
  weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
  weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
  weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
  longDateFormat: {
    LT: 'Ah点mm分',
    LTS: 'Ah点m分s秒',
    L: 'YYYY-MM-DD',
    LL: 'YYYY年MMMD日',
    LLL: 'YYYY年MMMD日Ah点mm分',
    LLLL: 'YYYY年MMMD日ddddAh点mm分',
    l: 'YYYY-MM-DD',
    ll: 'YYYY年MMMD日',
    lll: 'YYYY年MMMD日Ah点mm分',
    llll: 'YYYY年MMMD日ddddAh点mm分'
  },
  meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
  meridiemHour: function (h, meridiem) {
    let hour = h
    if (hour === 12) {
      hour = 0
    }
    if (meridiem === '凌晨' || meridiem === '早上' ||
      meridiem === '上午') {
      return hour
    } else if (meridiem === '下午' || meridiem === '晚上') {
      return hour + 12
    } else {
      // '中午'
      return hour >= 11 ? hour : hour + 12
    }
  },
  meridiem: function (hour, minute, isLower) {
    const hm = hour * 100 + minute
    if (hm < 600) {
      return '凌晨'
    } else if (hm < 900) {
      return '早上'
    } else if (hm < 1130) {
      return '上午'
    } else if (hm < 1230) {
      return '中午'
    } else if (hm < 1800) {
      return '下午'
    } else {
      return '晚上'
    }
  }
})
window.moment = moment
window.GLOBALS = {
  get shopUrl () {
    localStorage.setItem('showLoadPage', false)
    let url = ''
    url = '../../../payment/#/mall'
    return url
  },
  isWhiteUser: localStorage['isWhiteUser'] ? localStorage['isWhiteUser'] > 0 : 1,
  loopTime (_this, obj) {
    var date = new Date()
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    // var fixTime = 0;
    var fixTime = 24 * 60 * 60 * 1000
    var fixMornTime = 13 * 60 * 60 * 1000

    var nowTime = hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000

    var lastTime = 0

    if (fixTime > nowTime) {
      lastTime = fixTime - nowTime
    } else {
      lastTime = fixTime - nowTime + 24 * 60 * 60 * 1000
    }

    var that = this
    timer()
    var t = setInterval(timer, 1000)
    function timer () {
      if (lastTime <= 1) {
        _this.$set(obj, 'time', '')
        clearInterval(t)
        that.loopTime(_this, obj)
      }
      var hour = that.Appendzero(Math.floor((lastTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      var minute = that.Appendzero(Math.floor((lastTime % (1000 * 60 * 60)) / (1000 * 60)))
      var second = that.Appendzero(Math.floor((lastTime % (1000 * 60)) / 1000))
      _this.$set(obj, 'time', hour + ':' + minute + ':' + second)
      lastTime = lastTime - 1000
    }
  },
  Appendzero (obj) {
    if (obj < 10) return '0' + '' + obj
    else return obj
  },
  buryingPoint (id) {
    return
  },
  buriedPoint () {
    return
  },
  // 跳转外接游戏方法
  jumpOutsideGame (url, isParent = false) {
    util.jumpToGame({ url: url, isParent: isParent })
  },
  thirdSetsPoint () {
    return
  },

  /**
   * @description:2019年3月11日 新增埋点；2019年3月27日 新增埋点
   * @param {eventID,eventcontent}
   * @return:
   */
  async marchSetsPoint (eventid, eventcontent) {
    // 操作时间的毫秒数
    let dateNumber = Date.now()
    // 设备信息
    let userAgent = navigator.userAgent
    // 用户信息
    var userInfo = JSON.parse(localStorage.getItem('user_Info'))
    if (!userInfo) {
      let r = await axios.post('//uic-api.beeplaying.com/uic/api/user/login/transInfo')
      userInfo = r.data.data || r.data
      localStorage.setItem('user_Info', JSON.stringify(userInfo))
    };
    // 渠道id
    let _channel = localStorage.getItem('APP_CHANNEL') || 100001
    let defaultState = {
      plateform: 'h5',
      subplateform: userAgent.indexOf('Mac OS') > -1 ? 'ios' : 'android',
      version: localStorage.getItem('version_flag') && localStorage.getItem('version_flag') == 2 ? '2.0.0' : '1.0.0',
      channel: _channel,
      logs: [
        {
          uid: userInfo.userId,
          begintime: dateNumber,
          eventid: eventid,
          eventcontent: Object.assign({
            residual_gold: userInfo.amount,
            position_id: null,
            target_project_id: null,
            task_id: null,
            task_name: null,
            marketing_id: null,
            residual_jingdong: null,
            residual_phone: null,
            entrance: localStorage.getItem('platSource') || 'plat',
            from_project_id:this.getUrlParam('gametype')
          }, eventcontent)
        }
      ]
    }
    let formData = new FormData()
    formData.append('appName', 'wf_game')
    formData.append('json', JSON.stringify(defaultState))
    // 请求
    return axios.post('https://log-center.beeplaying.com/am/log/v1/json', formData, { timeout: 500 })
  },
  getUrlParam: function (ename) {
    var url = window.location.href
    var Request = new Object()
    if (url.indexOf('?') != -1) {
      var str = url.split('?')[1]
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
      }
    } else {
      return ''
    }
    return Request[ename]
  },
  remainingTime (_this, millisecond, obj, isText = false, fn) {
    var that = this
    timer()
    var t = setInterval(timer, 1000)

    function timer () {
      if (millisecond <= 1) {
        _this.$set(obj, 'time', '')
        clearInterval(t)
        if (fn) {
          fn()
        }
        return
      }
      var day = Math.floor(millisecond / (1000 * 60 * 60 * 24))
      var hour = Math.floor((millisecond % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      var minute = that.Appendzero(Math.floor((millisecond % (1000 * 60 * 60)) / (1000 * 60)))
      var second = that.Appendzero(Math.floor((millisecond % (1000 * 60)) / 1000))
      var hours = that.Appendzero(day * 24 + hour)
      if (isText) {
        _this.$set(obj, 'time', `${day}天${that.Appendzero(hour)}小时${minute}分${second}秒`)
      } else {
        _this.$set(obj, 'time', hours + ':' + minute + ':' + second)
      }
      millisecond = millisecond - 1000
    }
  },
  getJumpToGameUrl (url) {
    return util.jumpToGameUrl({ url: url })
  },
  // 格式化时间
  formatDate (date, type) {
    if (type == 'unix') {
      return moment(date).unix() * 1000
    }
    return moment(date).format(type)
  }
}

// 与游戏对接方法
window.WapCall = {
  openGame (url) {
    location.href = url + '?channel=' + localStorage.getItem('APP_CHANNEL')
  }

}
window.createFun = function (name, cb) {
  window[name] = cb
}
