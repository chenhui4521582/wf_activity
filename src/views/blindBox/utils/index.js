// 支付
export class Pay {
  // originDeffer 支付成功后返回的url
  // url 跳转支付页面的url
  // JDD_PARAM payment 缓存支付信息
  static toPay ({ originDeffer = location.href, payInfo }) {
    let url =
      'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true';
    localStorage.setItem('originDeffer', originDeffer)
    localStorage.setItem('payment', JSON.stringify(payInfo))
    location.replace(url)
  }
}
