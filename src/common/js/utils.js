import base64url from 'base64-url'
export default {
  // 获取地址栏问号后面的参数值
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
  // 获取地址栏问号后面的参数值新
  getUrlParamObj: function (ename) {
    var url = window.location.href
    var Request = new Object()
    if (url.indexOf('?') != -1) {
      var str = url.split('?')[1]
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
      }
    }
    return ename ? (Request[ename] ? Request[ename].split('#')[0] : '') : Request
  },
  checkValidate: function (type, text) {
    switch (type) {
      case 'pswd': return this.checkFormat(/^(\w){6,16}$/.test(text), '密码格式不正确')
      case 'code': return this.checkFormat(/^[A-Za-z0-9]{6}$/.test(text), '验证码不正确')
      case 'phone': return this.checkFormat(/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(text), '手机号码格式不正确')
      case 'name': {
        var len = 0
        for (var i in text) {
          if (/[^\x00-\xff]/.test(text[i])) len += 2
          else len++
        }
        if (len < 4 || len > 16) {
          return '昵称长度为4-16个字符'
        }
        return this.checkFormat(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/.test(text), '昵称格式不正确')
      }
    }
  },
  checkFormat: function (judge, info) {
    if (!judge) {
      return info
    } else {
      return false
    }
  },
  jumpToGame: function (item) {
    let token = localStorage.getItem('OPEN_ACCESS_TOKEN')
    let channel = GLOBALS.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL')
    if (item && item.url.indexOf('external=1') != -1) {
      if (item.url.includes('?external=1')) {
        let url =
          this.trimStr(item.url) +
          '&channel=' +
          channel +
          '&token=' +
          token +
          '&gurl=' +
          item.url.split('?')[0] +
          '&pf=' + window.linkUrl.getBackUrlFlag(channel)
        item.isParent ? parent.location.href = url : window.location.href = url
      } else {
        let url =
          this.trimStr(item.url) +
          '&channel=' +
          channel +
          '&token=' +
          token +
          '&gurl=' +
          base64url.encode(item.url.replace('?external=1', '').replace('&external=1', '')) +
          '&pf=' + window.linkUrl.getBackUrlFlag(channel)
        item.isParent ? parent.location.href = url : window.location.href = url
      }
      return
    }
    if (item && item.url.indexOf('databiger-h5') != -1) {
      let url =
        this.trimStr(item.url) +
        '?channel=' +
        channel +
        '&token=' +
        localStorage.getItem('ACCESS_TOKEN')
      item.isParent ? parent.location.href = url : window.location.href = url
      return
    }

    item.isParent ? parent.location.href = item.url + '?channel=' + channel : location.href = item.url + '?channel=' + channel
  },
  trimStr: function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  },
  jumpToGameUrl: function (item) {
    let token = localStorage.getItem('OPEN_ACCESS_TOKEN')
    let channel = GLOBALS.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL')
    if (item && item.url.indexOf('external=1') != -1) {
      if (item.url.includes('?external=1')) {
        return this.trimStr(item.url) +
          '&channel=' +
          channel +
          '&token=' +
          token +
          '&gurl=' +
          item.url.split('?')[0] +
          '&pf=' + window.linkUrl.getBackUrlFlag(channel)
      } else {
        return this.trimStr(item.url) +
          '&channel=' +
          channel +
          '&token=' +
          token +
          '&gurl=' +
          base64url.encode(item.url.replace('?external=1', '').replace('&external=1', '')) +
          '&pf=' + window.linkUrl.getBackUrlFlag(channel)
      }
      return
    }
    if (item && item.url.indexOf('databiger-h5') != -1) {
      return this.trimStr(item.url) +
        '?channel=' +
        channel +
        '&token=' +
        localStorage.getItem('ACCESS_TOKEN')
    }
    if (item && item.url.indexOf('?fixedEntry') != -1) {
      return this.trimStr(url.replace('?fixedEntry', '')) + '?channel=' + channel + '&opentoken=' + token
    }
    if (item && item.url.indexOf('#/?') != -1) {
      return item.url + '&channel=' + channel
    }
    return item.url +
      '?channel=' +
      channel
  },
  isIOS: function () {
    let U = window.navigator.userAgent
    return !(U.indexOf('Android') > -1 || U.indexOf('Adr') > -1)
  },
  isAndroid: function () {
    let U = window.navigator.userAgent
    return !U.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  },
  move (e) {
    e.preventDefault()
  },
  ScrollNoMove () {
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', this.move, { passive: false })
  },
  ScrollMove () {
    document.body.style.overflow = null
    document.removeEventListener('touchmove', this.move, { passive: false })
  }
}
