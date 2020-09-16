import AppCall from './appcall'

// 帐号操作接口
AppCall.extend({
  // wx登录
  WXLogin: function () {
    return AppCall.call('WXLogin')
  },
  // qq登录
  QQLogin: function () {
    return AppCall.call('QQLogin')
  },
  loginSucceed: function () {
    return AppCall.call('loginSucceed')
  },
  getProductData: function () {
    return new Promise((r, j) => {
      AppCall.call('getProductData', function (res) {
        r(res)
      })
    })
  },
  openUrl: function (callback) {
    return this.call('openUrl', callback)
  },
  shareContent: function (callback) {
    return this.call('shareContent', callback)
  },
  // 清空缓存
  cleanCache: function () {
    return this.call('cleanCache')
  },
  registerForRemote: function () {
    return this.call('registerForRemote')
  },
  // IOS显示0，隐藏1，浮点
  isFloatButton: function (params) {
    return this.call('isFloatButton', params)
  }
})

export default AppCall
