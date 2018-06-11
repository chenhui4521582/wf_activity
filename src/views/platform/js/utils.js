const jumpToGame = (item) => {
  function getUrlParam (ename) {
    var url = window.location.href
    var Request = new Object()
    if (url.indexOf('?') != -1) {
      var str = url.split('?')[1]
      var strs = str.split('&')
      for (var i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    } else {
      return ''
    }
    return Request[ename]
  }

  function trimStr (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  if (item && item.url.indexOf('external=1') != -1) {
    let url =
      trimStr(item.url) +
      '&channel=' +
      localStorage.getItem('APP_CHANNEL') +
      '&token=' +
      localStorage.getItem('ACCESS_TOKEN') +
      '&gurl=' +
      item.url.split('?')[0] +
      '&pf=' +
      getUrlParam('from')

    window.location.href = url
    return
  }
  if (item && item.url.indexOf('databiger-h5') != -1) {
    let url =
      trimStr(item.url) +
      '?channel=' +
      localStorage.getItem('APP_CHANNEL') +
      '&token=' +
      localStorage.getItem('ACCESS_TOKEN')
    window.location.href = url
    return
  }
  if (localStorage.getItem('APP_CHANNEL') == '100006') {
    location.href =
      '../../../channel/newokooo/billiards/' +
      '?channel=' +
      localStorage.getItem('APP_CHANNEL') +
      '&token=' +
      localStorage.getItem('ACCESS_TOKEN')
  } else {
    location.href =
      item.url +
      '?channel=' +
      localStorage.getItem('APP_CHANNEL') +
      '&token=' +
      localStorage.getItem('ACCESS_TOKEN')
  }
}

export {
  jumpToGame
}
