new function() {
  var _self = this;
  _self.width = 720; //设置默认最大宽度
  _self.fontSize = 100; //默认字体大小
  _self.widthProportion = function() {
	var p = (document.body && document.body.clientWidth || document.getElementsByTagName("html")[0].offsetWidth) / _self.width;
	return p > 1 ? 1 :p;
  };
  _self.changePage = function() {
	document.getElementsByTagName("html")[0].setAttribute("style", "font-size:" + _self.widthProportion() * _self.fontSize + "px !important");
  }
  _self.changePage();
  window.addEventListener('resize', function() {
	_self.changePage();
  }, false);

    // let hm = document.createElement("script");
    // hm.src = `https://wap.beeplaying.com/ErrorPage/linkUrl.js?time=${new Date().getTime()}`;
    // let s = document.getElementsByTagName("script")[0];
    // s.parentNode.insertBefore(hm, s);

  var time1 = new Date().getTime();
  var script1 = document.createElement("script");
  script1.type = "text/javascript";
  script1.src = 'https://wap.beeplaying.com/ErrorPage/linkUrl.js?time='+(new Date().getTime())
  document.head.appendChild(script1);    
};
