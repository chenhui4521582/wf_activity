/**
 * @description 获取地址栏问号后面的参数值
 * @param {*} ename 
 */
export const getUrlParam = (ename)=> {
    let url = window.location.href
    let Request = new Object()
    if (url.indexOf('?') != -1) {
      let str = url.split('?')[1]
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
          Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
    } else {
      return ''
    }
    let params = Request[ename] ? Request[ename].split('#')[0] : ''
    return params
}