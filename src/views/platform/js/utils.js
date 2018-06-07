const jumpToGame = (item) => {
  if (item && item.url.indexOf('external=1') != -1) {
    let url =
      this.trimStr(item.url) +
      '&channel=' +
      localStorage.getItem('APP_CHANNEL') +
      '&token=' +
      localStorage.getItem('ACCESS_TOKEN') +
      '&gurl=' +
      item.url.split('?')[0] +
      '&pf=' +
      this.getUrlParam('from')

    window.location.href = url
  }
  if (item && item.url.indexOf('databiger-h5') != -1) {
    let url =
      this.trimStr(item.url) +
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

export {jumpToGame}
