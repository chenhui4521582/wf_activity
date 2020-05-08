/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
// import router from './router'
import Vue from 'vue'
import utils from '../../common/js/utils'
// axios 配置
axios.defaults.timeout = 5000

let channel = utils.getUrlParam('channel') ? utils.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL'),
  version = localStorage.getItem('APP_VERSION')
  localStorage.setItem('APP_CHANNEL', channel)
if (localStorage.getItem('APP_CHANNEL') === '100001') {
  localStorage.setItem('APP_VERSION', '1.0.0')
} else {
  localStorage.setItem('APP_VERSION', '1.0.0')
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么486d88c9c827406d9a31c9ca22c2cd89
  let token = localStorage.getItem('ACCESS_TOKEN')
  config.headers.Authorization = token
  config.headers['App-Channel'] = channel && /\d+/.exec(channel) && /\d+/.exec(channel)[0]
  config.headers['App-Version'] = version
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
  // return '';
})

axios.interceptors.response.use(
  response => {
    var res = JSON.parse(response.request.response)
    if (res && res.code && res.code !== 200) {
      switch (res.code) {
        case 400:
          Vue.prototype.$toast.show({
            message: '请求处理失败',
            duration: 1500
          })
          break
        case 404:
          Vue.prototype.$toast.show({
            message: '请求地址出错！',
            duration: 1500
          })
          break
        case 408:
          // Vue.prototype.$toast.show({
          //   message: '请求超时',
          //   duration: 1500
          // })
          break
        case 500:
          Vue.prototype.$toast.show({
            message: '服务器内部错误',
            duration: 1500
          })
          break

        case 501:
          Vue.prototype.$toast.show({
            message: '服务未实现',
            duration: 1500
          })
          break

        case 502:
          Vue.prototype.$toast.show({
            message: '网关错误',
            duration: 1500
          })
          break

        case 503:
          Vue.prototype.$toast.show({
            message: '服务不可用',
            duration: 1500
          })
          break

        case 504:
          Vue.prototype.$toast.show({
            message: '网关超时',
            duration: 1500
          })
          break
        case 122, 128, 101:
          break
        default:
          var result = response.config && response.config.data
          if (result) {
            result = JSON.parse(result)
            if (result && result.isShowToast === 'false') {
              break
            }
          }
      }
    }
    return response
  },
  error => {
    // let aa = `timeout of ${axios.defaults.timeout}ms exceeded`;
    // error = JSON.stringify(error);

    // console.log(error.response.status)
    if (error && error.response) {

    } else {
      error = JSON.stringify(error)
      if (error.indexOf('timeout') !== -1) {
        // Vue.prototype.$toast.show({
        //   message: '请求超时',
        //   duration: 1500
        // })
        return
      }
    }
    return Promise.reject(error)
    // return '';
  }
)
export default axios
