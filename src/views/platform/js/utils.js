import base64url from 'base64-url'
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
  let token=localStorage.getItem('OPEN_ACCESS_TOKEN')
  let channel=localStorage.getItem('APP_CHANNEL')
  if (item && item.url.indexOf('external=1') != -1) {
    if (item.url.includes('?external=1')) {
      let url =
        trimStr(item.url) +
        '&channel=' +
          channel +
        '&token=' +
          token +
        '&gurl=' +
        item.url.split('?')[0] +
        '&pf=' +
          window.linkUrl.getBackUrlFlag(channel)
      window.location.href = url
    } else {
      let url =
        trimStr(item.url) +
        '&channel=' +
          channel +
        '&token=' +
          token +
        '&gurl=' +
        base64url.encode(item.url.replace('?external=1', '').replace('&external=1', '')) +
        '&pf=' +
          window.linkUrl.getBackUrlFlag(channel)
      window.location.href = url
    }
    return
  }
  if (item && item.url.indexOf('databiger-h5') != -1) {
    let url =
      trimStr(item.url) +
      '?channel=' +
        channel +
      '&token=' +
      localStorage.getItem('ACCESS_TOKEN')
    window.location.href = url
    return
  }
  if (localStorage.getItem('APP_CHANNEL') == '100006') {
    location.href =
      '../../../channel/newokooo/billiards/' +
      '?channel=' +
        channel
  } else {
    location.href =
      item.url +
      '?channel=' +
        channel
  }
}

export {
  jumpToGame
}
