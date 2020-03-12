export class Pay {
  // originDeffer 支付成功后返回的url
  // url 跳转支付页面的url
  // JDD_PARAM payment 缓存支付信息
  static toPay ({ originDeffer = location.href, payInfo }) {
    localStorage.setItem('originDeffer', originDeffer)
    localStorage.setItem('JDD_PARAM', JSON.stringify(payInfo))
    payInfo.gameId = 28
    localStorage.setItem('payment', JSON.stringify(payInfo))
    let url =
      'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    location.href = url
  }
}

export const isFirst = param => {
  const oldDate = localStorage.getItem(param)
  const nowDate = new Date().getTime()
  if (!oldDate || (nowDate - Number(oldDate)) / 1000 > 86400) {
    localStorage.setItem(param, nowDate)
    return true
  }
  return false
}

export const isShowNotice = () => {
  // 1.11号之后才会点击出现
  const noticeBeginTime = new Date(2020, 0, 11).getTime()
  const nowDate = new Date().getTime()
  if (nowDate < noticeBeginTime) return
  if (isFirst('boxClickNotice')) return true
  return false
}

export const isShowMyPrizeNotice = () => {
  if (isFirst('myPrizeNotice')) return true
  return false
}
