const channelFlag = window.linkUrl.getBackUrlFlag(GLOBALS.channel)

/**
 * @param {array} arr 根据频道匹配的规则数组
 * @param {string} default 未匹配到频道的默认拼接url
 * @des 不同渠道跳转的链接不同
 * @return {string} url 最终跳转链接
 */
export const findUrl = (arr, defaultUrl = '') => {
  let splitUrl = arr.find(res => res.channel === channelFlag)
  if (splitUrl) return `https://wap.beeplaying.com/${channelFlag}/${splitUrl.url}`
  return defaultUrl
}

// 支付
export class Pay {
  defaultUrl = 'https://wap.beeplaying.com/payment/#/payment'
  defaultStorage = 'JDD_PARAM'
  payArr = [
    {
      channel: 'bdWap',
      url: 'https://wap.beeplaying.com/payment/#/bdPayment',
      payStorage: 'JDD_PARAM'
    },
    {
      channel: 'xmWap',
      url: 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist',
      payStorage: 'payment'
    }
  ]
  // originDeffer 支付成功后返回的url
  // url 跳转支付页面的url
  // JDD_PARAM payment 缓存支付信息
  static toPay ({ originDeffer = location.href, payInfo }) {
    let url = this.defaultUrl
    let payStorage = this.defaultStorage
    let pay = this.payArr.find(res => res.channel === channelFlag)
    if (pay) {
      url = pay.url
      payStorage = pay.payStorage
    }
    localStorage.setItem(payStorage, payInfo)
    localStorage.setItem('originDeffer', originDeffer)
    location.href = url
  }

  static clearPayInfo () {
    if (localStorage.getItem('originDeffer')) localStorage.removeItem('originDeffer')
    if (localStorage.getItem('JDD_PARAM')) localStorage.removeItem('JDD_PARAM')
    if (localStorage.getItem('payment')) localStorage.removeItem('payment')
  }
}
