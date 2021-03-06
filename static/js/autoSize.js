new function () {
  var _self = this
  _self.width = 720 // 设置默认最大宽度
  _self.fontSize = 100 // 默认字体大小
  _self.widthProportion = function () {
    var p = (document.body && document.body.clientWidth || document.getElementsByTagName('html')[0].offsetWidth) / _self.width
    return p > 1 ? 1 : p
  }
  _self.changePage = function () {
    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + _self.widthProportion() * _self.fontSize + 'px !important')
    localStorage.setItem('fontsize',_self.widthProportion() * _self.fontSize)
  }
  _self.changePage()
  window.addEventListener('resize', function () {
    _self.changePage()
  }, false)

  var script1 = document.createElement('script')
  script1.type = 'text/javascript'
  script1.src = 'https://wap.beeplaying.com/ErrorPage/linkUrl.js?time=' + (new Date().getTime())
  document.head.appendChild(script1)
}()
