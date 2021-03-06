/**
 * http配置
 */
import axios from 'axios'
import Vue from 'vue'
import utils from '@/common/js/utils'
// axios 配置
axios.defaults.timeout = 5000

let channel = utils.getUrlParam('channel') ? utils.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL'),
  token = utils.getUrlParam('token') ? utils.getUrlParam('token') : localStorage.getItem('ACCESS_TOKEN'),
  version = localStorage.getItem('APP_VERSION')

if (token) {
  localStorage.setItem('ACCESS_TOKEN', token)
}
if (channel) {
  localStorage.setItem('APP_CHANNEL', channel)
}
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么486d88c9c827406d9a31c9ca22c2cd89
  config.headers.Authorization = token
  config.headers['App-Channel'] = channel && /\d+/.exec(channel) && /\d+/.exec(channel)[0]
  config.headers['App-Version'] = version
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    var res = JSON.parse(response.request.response)
    if (res && res.code && res.code != 200) {
      switch (res.code) {
        case 400:
          Vue.prototype.$toast.show({
            message: '请求处理失败',
            duration: 1500
          })
          break
        case 401:
          Vue.prototype.$toast.show({
            message: '未授权，请登录！',
            duration: 1500
          })
          break
        case 404:
          Vue.prototype.$toast.show({
            message: '请求地址出错！',
            duration: 1500
          })
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
      }
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
