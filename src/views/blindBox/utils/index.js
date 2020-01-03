export class Pay {
  // originDeffer 支付成功后返回的url
  // url 跳转支付页面的url
  // JDD_PARAM payment 缓存支付信息
  static toPay ({ originDeffer = location.href, payInfo }) {
    localStorage.setItem('originDeffer', originDeffer)
    localStorage.setItem('JDD_PARAM', JSON.stringify(payInfo))
    localStorage.setItem('payment', JSON.stringify(payInfo))
    let url =
      'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    location.href = url
  }
}

export const isShowNotice = () => {
  const oldDate = localStorage.getItem('boxClickNotice')
  const nowDate = new Date().getTime()
  if (!oldDate || (nowDate - Number(oldDate)) / 1000 > 86400) {
    localStorage.setItem('boxClickNotice', nowDate)
    return true
  }
  return false
}
