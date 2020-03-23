
class utils {
  getUrlParams (ename) {
    let url = window.location.href
    let Request = {}
    if (url.indexOf('?') != -1) {
      let str = url.split('?')[1]
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        Request[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    }
    return ename
      ? Request[ename]
        ? Request[ename].split('#')[0]
        : ''
      : Request
  }
  move (e) {
    e.preventDefault()
  }
  ScrollNoMove () {
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', this.move, { passive: false })
  }
  ScrollMove () {
    document.body.style.overflow = null
    document.removeEventListener('touchmove', this.move, { passive: false })
  }
}

let newUtils = new utils()
export default newUtils
