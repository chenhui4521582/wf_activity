/* eslint-disable no-undef */
const channelFlag = window.linkUrl.getBackUrlFlag(GLOBALS.channel)

// 支付
const defaultUrl = 'https://wap.beeplaying.com/payment/#/payment'
const defaultStorage = 'JDD_PARAM'
const payArr = [
  {
    channel: 'bdWap',
    url: 'https://wap.beeplaying.com/payment/#/bdPayment',
    payStorage: 'JDD_PARAM'
  },
  {
    channel: 'xmWap',
    url: 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true',
    payStorage: 'payment'
  }
]
export class Pay {
  // originDeffer 支付成功后返回的url
  // url 跳转支付页面的url
  // JDD_PARAM payment 缓存支付信息
  static toPay ({ originDeffer = location.href, payInfo }) {
    let url = defaultUrl
    let payStorage = defaultStorage
    let pay = payArr.find(res => res.channel === channelFlag)
    if (pay) {
      url = pay.url
      payStorage = pay.payStorage
    }
    localStorage.setItem(payStorage, JSON.stringify(payInfo))
    localStorage.setItem('originDeffer', originDeffer)
    if (localStorage.getItem('checkPlatOrderStatus')) localStorage.removeItem('checkPlatOrderStatus')
    if (localStorage.getItem('checkOrderStatus')) localStorage.removeItem('checkOrderStatus')
    location.href = url
  }
}
