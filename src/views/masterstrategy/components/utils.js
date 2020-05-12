import _get from 'lodash.get'
class utils {
  bottomBarJump (url, router_name, router, query) {
    if (!url) return false
    let APP_CHANNEL = this.getUrlParams('channel') || this.localStorage().get('APP_CHANNEL') || 10000
    if (APP_CHANNEL == 100039001) {
      if (!url.includes('http')) {
        let code = encodeURIComponent(`https://wap.beeplaying.com/xmWap/${url}`)
        url = `baiduhaokan://webview/?url_key=${code}`
      } else {
        url = `baiduhaokan://webview/?url_key=${encodeURIComponent(url)}`
      }
      window.location.href = url
    } else {
      if (router_name && router) {
        router.push({
          name: router_name,
          query
        })
      }
      else if (!url.includes('http')) {
        url = `https:${state.HOST_PLATFORM}/xmWap/${url}`
      }
      else {
        window.location.href = url
      }
    }
  }
  localStorage () {
    return {
      getString: key => {
        let store = window.localStorage
        let data = store.getItem(key)
        if (!data) {
          return false
        }
        return data
      },
      get: key => {
        let store = window.localStorage
        let data = store.getItem(key)
        if (!data) {
          return false
        }
        return JSON.parse(data)
      },
      set: (key, value) => {
        let store = window.localStorage
        if (typeof value === 'string') {
          store.setItem(key, value)
          return false
        }
        let stringData = JSON.stringify(value)
        store.setItem(key, stringData)
      },
      remove: function (key) {
        let store = window.localStorage
        store.removeItem(key)
      }
    }
  }
  trimStr (str) {
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
  openGame (url, SDK, params) {
    let APP_CHANNEL = this.localStorage().getString('APP_CHANNEL')
    let baseUrl = `https://wap.beeplaying.com/${url}?channel=${APP_CHANNEL}&time=${new Date().getTime()}${params || ''}`
    if (SDK) {
      parent.location.href = baseUrl
    } else {
      this.bottomBarJump(baseUrl)
    }
  }
  jumpUrl (item, SDK, params) {
    /** 没有传入任何值 **/
    let URL = _get(item, 'url', false)
    if (!URL || URL == null) {
      return false
    }
    /** 跳转外接游戏 **/
    URL = this.trimStr(URL)
    let APP_CHANNEL = this.localStorage().getString('APP_CHANNEL')
    let OPEN_TOKEN = this.localStorage().getString('OPEN_ACCESS_TOKEN')
    let WJ_GAMETYPE = item.gameType || item.type || ''
    if (URL.indexOf('external=1') != -1 || URL.indexOf('?external=1') != -1) {
      let url = `${URL}&channel=${APP_CHANNEL}&token=${OPEN_TOKEN}&gurl=${base64url.encode(
        URL.replace('?external=1', '').replace('&external=1', '')
      )}&pf=xmWap&gameType=${WJ_GAMETYPE}`
      if (WJ_GAMETYPE) {
        window.localStorage.setItem('wj_gameType', WJ_GAMETYPE)
        axios.post(
          '//platform-api.beeplaying.com/wap/api/game/firstLoad/' + WJ_GAMETYPE
        )
        axios.post(
          '//ops-api.beeplaying.com/ops/api/h5game/saveBehavior'
        )
      }
      if (SDK) {
        parent.location.href = url
      } else {
        this.bottomBarJump(url)
      }
      return false
    }
    /** 跳转绝对路劲**/
    if (URL.indexOf('https') != -1) {
      if (SDK) {
        parent.location.href = URL
      } else {
        this.bottomBarJump(URL)
      }
      return
    }
    /** 跳转竞猜游戏 **/
    URL = URL.replace('/', '')
    this.openGame(URL, SDK, params)
  }
  isEmptyArray (array) {
    if (array instanceof Array) {
      return !array.length
    } else {
      console.error('传入的值非数组')
    }
  }
  isEmptyObject (object) {
    if (object instanceof Object) {
      return !Object.keys(object).length
    } else {
      console.error('传入的值非对象')
    }
  }
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
