import 'babel-polyfill'
import Vue from 'vue'
import axios from './http'
import App from './App'
import fastclick from 'fastclick'
import Toast from '../../plugins/toast'
import VueClipboard from 'vue-clipboard2'
import '@/common/js/window.js'
Vue.use(Toast)
Vue.config.productionTip = false
fastclick.attach(document.body)
Vue.prototype.axios = axios

// 复制
Vue.use(VueClipboard)
Vue.filter('filter', function (url) {
  if (url && !url.includes('http')) {
    return '//file.beeplaying.com' + url
  } else {
    return url
  }
})
new Vue({
  el: '#app',
  axios,
  template: '<App/>',
  components: { App }
})
